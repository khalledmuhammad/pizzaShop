const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
require('dotenv').config();

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique:true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default: 'user'
    },
    firstname:{
        type:String,
        maxLength: 100,
        trim:true
    },
    lastname:{
        type:String,
        maxLength: 100,
        trim:true
    },
    age:{
        type:Number
    },
    
},
{ timestamps: true }

);

//middleware befor saving to database to hash the password !!
userSchema.pre('save',async function(next){ //before save event occurs , if userSchema.post will be after save
    let user = this;  /* this is refering to the current user before being saved to db */
     if(user.isModified('password')){
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password,salt);
        user.password = hash;
    }
    next();
});
//static method to check if email taken --static methods should be called
userSchema.statics.emailTaken = async function(email){
    const user = await this.findOne({email});
    return !!user; //not path if email exist else the excution will kep moving forwared
}

userSchema.methods.GenerateToken =  function(){
    let user = this ; 
    const useObj= {_id : user._id.toHexString(), email : user.email}
    const token = jwt.sign(useObj ,process.env.DB_TOKEN ,{expiresIn:'1d'} )
    return token
}

userSchema.methods.deCryptPassword = async function(password){
    let user = this;
    const decrypt = await bcrypt.compare(password , user.password)
    return decrypt
}



const User =  mongoose.model("User" , userSchema)
module.exports = {User}


