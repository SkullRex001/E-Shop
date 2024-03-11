const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : [true , "please enter your name"],
        maxLength : [30 , "name cannot exceed 30 characters"],
        minLength : [4 , "name must be atleast 4 characters"]

    },
    
    email : {
        type : String,
        require : [true , "please enter your email"],
        unique: true,
        validate : [validator.isEmail , "please enter a valid email"],

    },

    password : {
        type : String,
        require : [true , "please enter password"],
        minLength : [8 , "password must be greater than 8 characters"],
        select : false

    },

    avater : {
        public_id : {
            type : String
        } , 
        url : {
            type : String ,
            require : true
        }
    },


    role: {
        type : String, 
        default : 'user'
   },

   resetPasswordToken : String,

   resetPasswordExpire : Data


})

module.exports = mongoose.model('User' , userSchema)