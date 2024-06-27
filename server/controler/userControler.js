const { json } = require('express')
const User = require('../DBModel/userModel')
const factory = require('./handelFactory')
const filterObject = (obj, ...allowedFields)=>{
    const newObj ={}
    Object.keys(obj).forEach(el=>{
        if(allowedFields.includes(el)) newObj[el] = obj[el]
    })
    return newObj
}

exports.getAllUser = async(req,res,next)=>{
    const user = await User.find()
    if(!user){
        res.status(401).json({message:"User not Exixts"})
    }
    res.status(200).json({
        status:'success',
        results: user.length,
        data:{
            user
        }
    })
    next()
}
exports.getMe = (req,res,next)=>{
    req.params.id = req.user.id;
    next()
}
exports.updateMe = async(req,res,next)=>{
    //1 create error when user post password data 
    if(req.body.password || req.body.passwordconform){
        res.status(404).json(
            {status:"error", 
            message:"this route is not password update/ updateMyPassword"
        })
    }
    // update user documents 
    const filterBody = filterObject(req.body, 'name', 'email') 
    const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody , {new:true, runValidators:true})
    res.status(404).json({
        status:'success',
        data:{
            user:updateUser
        }
    })
}
exports.deleteUser = async(req,res,next)=>{
    try{
        const id = req.params.id
        console.log(`user id${id}`)
        res.status(202).json({status:"seccuss", message:"user delete"})
    }catch(eror){
        console.log(eror)
    }
}
exports.deleteMe = async(req,res,next)=>{
    await User.findByIdAndDelete(req.user.id, {active:false})
    res.status(204).json(
        {status:'success', data:null}
    )
}
exports.createUser = (req,res,next)=>{
    res.status(200).json({
        status:'s',
        message:"the routes is run"
    })
}
exports.getUser = factory.getOne(User)

exports.updateUser = (req,res,next)=>{
    res.status(200).json({
        status:'s',
        message:"the routes is run"
    })
}
