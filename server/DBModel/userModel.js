const crypto = require('crypto')
const mongoose = require('mongoose')
const validater = require('validator')
const bcrypt = require('bcryptjs')
const { type } = require('os')
// name ,email,photo,password, conformpassword
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true , 'Please Enter Your Name']
    },
    email:{
        type:String,
        required: [true,"Please Enter your Email"],
        unique:true,
        lowercase:true,
        validate: [validater.isEmail, 'please provided Email']
    },
    photo:String,
    role: { type: String, enum: ['user','guide','lead-guide', 'admin'], default: 'user' },
    password:{
        type:String,
        required:[true,'please Provide Password'],
        minlength: 8,
        select:false
    },
    
    passwordConform:{
        type:String,
        required:[true,'please Provded Conform password'],
        validate:{
            validator: function(el){
                return el === this.password

            }    
        },
        message: 'passowrd are not the same'
    },

    passwordChangeAt:{
        type: Date, 
    },
    passwordresetToken: String,
    passwordresetExpries: Date,
    active:{
        type:Boolean,
        default:true,
        select: false
    }
})
userSchema.pre('save', async function(next){
    //only this part of code run when the passord is modified 
    if(!this.isModified('password')) return next()
    // the password is encrypted 
    this.password = await bcrypt.hash(this.password , 12)
    ///
    this.passwordConform = undefined;
    next()
})

userSchema.pre('save', function(next){
    if(!this.isModified('password') || this.isNew) return next()
    this.passwordChangeAt = Date.now() - 1000;
    next()
})
userSchema.pre(/^find/, function(next){
    // this point to cuurent query 
    this.find({active: {$ne:false}})
    next()
})
userSchema.methods.correctPassword = async function(canidatePassword, userPassword){
    return await bcrypt.compare(canidatePassword,userPassword)
 }
userSchema.methods.changePasswordAfter = function(JWTTimestamp){
    if(this.passwordChangeAt){
        const changeTimeStamp = parseInt(this.passwordChangeAt.getTime() / 1000, 10)
        console.log(changeTimeStamp, JWTTimestamp)
        return JWTTimestamp < changeTimeStamp;
    }
    return false
}

userSchema.methods.createPasswordResetToken = function(){
    const restToken = crypto.randomBytes(32).toString('hex')
    this.passwordresetToken = crypto.createHash('sha256').update(restToken).digest('hex')
    //console.log({restToken}, this.passwordresetToken)
    this.passwordresetExpries = Date.now() + 10 * 60 * 1000
    return restToken;
}

const User = mongoose.model('User', userSchema)

module.exports = User;



