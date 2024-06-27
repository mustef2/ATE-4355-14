const util = require('util')
const promisify = util.promisify
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const User = require('../DBModel/userModel')
const path = require('path')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const sendEmail = require('../utils/email')

//funcation
const signToken = (id,name,email,photo,role)=>{
    return jwt.sign({id:id,name:name,email:email,photo:photo,role:role}, process.env.JWT_TOkEN_KEY,{
        expiresIn: process.env.JWT_EXPRIES_IN
    })
}

const creatSendToken = (user, stausCode, res)=>{
    const token = signToken(user._id)
    res.status(stausCode).json({
        status: "seccuse",
        token,
        data:{
            user
        }
    })
}

//image upload 
// Multer storage configuration
//signup api 
exports.signup =  async(req,res)=>{
    try{
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            photo: req.file ? req.file.path : null,
            role: req.body.role,
            password: req.body.password,
            passwordConform: req.body.passwordConform,
            passwordChangeAt : req.body.passwordChangeAt,
        })
        const token = signToken(newUser._id)
        const cookieOptions ={
            expires: new Date(Date.now() + process.env.JWT_TOKEN_ESPRIES_IN * 24 * 60 *60 * 1000),
            httpOnly:true ,
            secure: req.secure || req.headers['x-forwarded-proto'] === 'https' 
        }
        if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;
        res.cookie('jwt', token , cookieOptions)
        newUser.password = undefined
        res.status(200).json({
            status:'User Create Seccessfully',
            token,
            data:{
                user : newUser
            }
        })
    }catch(err){
        console.log('error', err)
        res.status(500).json({
            status:'user Cannot Created',
            message: err
        })
    }
}
//login api
exports.login = async(req,res)=>{
    try{
        const {email , password} = req.body;
        //1)check if the email and password exist 
        if(!email || !password){
            res.status(400).json({
                status:"failed",
                message:"All fields are required"
            })
        }
        //2) check of the user exist then email and passowrd is correct
        const user =  await User.findOne({ email }).select('+password')

        if(!user || !(await user.correctPassword(password , user.password))){
             res.status(401).json({
                status:"failed",
                message:"Incorrect email or password"
             })
             return;
        }
        //3) if every think is ok send to the client
        const token = signToken(user._id,user.name,user.email,user.photo ,user.role)
        const cookieOptions ={
            expires: new Date(Date.now() + process.env.JWT_TOKEN_ESPRIES_IN * 24 * 60 *60 * 1000),
            httpOnly:true,
            secure: req.secure || req.headers['x-forwarded-proto'] === 'https'  
        }
        if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;
        res.cookie('jwt', token , cookieOptions)
        // Remove password from output
        user.password = undefined;
        console.log(user.role)
        res.status(200).json({
            status: 'success',
            token,
            data: {
              user
            }
          });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
// protect api 
exports.protect  = async(req,res,next)=>{
    let token ;
    //1) getting the token if there 
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if(!token){
        return res.status(401).json({
            status:'Failed',
            message: 'you are not logged In ! please login to get access'
        })
    }
    //2) verifaction the token
    try{
        const decode = await promisify(jwt.verify)(token , process.env.JWT_TOkEN_KEY)
        const currentUser = await User.findById(decode.id)
        //3) user exist are not
        if(!currentUser){
            return res.status(401).json({message:'user didnot exist'})
        }
        //4)check if the user change password  after token was changed
        if(currentUser.changePasswordAfter(decode.iat)){
            return  res.status(401).json({message: ' user recent change password please login again'})
        }
        req.user = currentUser;
        res.locals.user = currentUser;
        next()
    }catch(error){
        return res.status(401).json({
            status: 'Failed',
            message: 'Invalid token! Please login again to get access.'
        });
    }
};

// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt) {
      try {
        // 1) verify token
        const decoded = await promisify(jwt.verify)(
          req.cookies.jwt,
          process.env.JWT_SECRET
        );
  
        // 2) Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
          return next();
        }
  
        // 3) Check if user changed password after the token was issued
        if (currentUser.changedPasswordAfter(decoded.iat)) {
          return next();
        }
  
        // THERE IS A LOGGED IN USER
        res.locals.user = currentUser;
        return next();
      } catch (err) {
        return next();
      }
    }
    next();
  };
//restracted api
exports.restrictTo = (role) => {
    return (req, res, next) => {
      // roles ['admin', 'lead-guide']. role='user'
      if(!req.user){
        res.status(401).json({message:"You are not logged in!"})
      }
      if (req.user.role !== role) {
        return res.status(403).json({status:"failed",message: "you do not have permission to perform this action"
      });
    }
    next();
};
};
// for password api
exports.forgetPassword = async(req,res,next)=>{
    // 1)get user based on the post email
    const duser = await User.findOne({
        email: req.body.email
    })
    if (!duser) {
        res.status(404).json({
            status: "failed",
            message: "there are no user with this email"
        });
    }
    //2)Genrated random token 
    const restToken = await duser.createPasswordResetToken();
    await duser.save({validateBeforeSave:  false})
    //3)send it to the user email
    const resetUrl = `${req.protocol}://${req.get(
        'host',
    )}/api/users/resetPassword/${restToken}`
    const message = `forget your password? Submit your petch request with your new password 
    and Conform your password to: ${resetUrl}.\n 
    if you didnot forget your password  plese ignor this message`
    
    try{
        await sendEmail({
            email : duser.email,
            subject : 'your reset token valid  for 10 min',
            message
        })
        res.status(200).json({
            status: 'sccuesss',
            message: 'Token sent to  Email'
        })

    }catch(err){
        duser.createPasswordResetToken = undefined
        duser.passwordresetExpries = undefined
        await duser.save({validateBeforeSave:  false})
        res.status(500).json({
            status: 'Failed',
            message: 'there is an error sending email please try again'
        })
    }
    
    next()
}
exports.resetPassword = async (req,res,next)=>{
    //console.log(req.params.token)
    // get user base on the token
    const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

    const user = await User.findOne({passwordresetToken : hashedToken, passwordresetExpries:{ $gt: Date.now() }})

    //if the token is not expired they send to user  set the new password 
    if(!user){
         res.status(404).json({
            status:"failed",
            message:"the token is invalid or expires"
        })
    }
    user.password = req.body.password
    user.passwordConform = req.body.passwordConform
    user.passwordresetToken = undefined
    user.passwordresetExpries = undefined
    await user.save()
    // update password changed  property for the user 
    //log the user ans send to jwt 
    const token = signToken(user._id)
    console.log(token)
    // send token into cookies 

    res.status(200).json({
        status: "seccuse",
        token,
    })
    next()
}
//update password api
exports.updatePassword = async(req,res,next)=>{
    // 1)get user from collection
    const user = await User.findById(req.user.id).select('+password')
    // 2)check if posted password is correct
    if(!(await user.correctPassword(req.body.passwordCuurent, user.password))){
        res.status(500).json({status:"fail", message:"your cuurent password is incorrect"})
    }
    // 3)if so update password
    user.password = req.body.password;
    user.passwordConform = req.body.passwordConform;
    await user.save() 
    // 4)log in user and send jwt 
    creatSendToken(user, 200, res)
}
//logout
exports.logout = (req,res)=>{
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
      });
    res.status(200).json({ status: 'success' });
}
