const catchAsyncError = require('../middleware/catchAsyncError')
const User = require('../model/userModel')
const Product = require('../model/productModel')
const sendToken = require('../utils/jwtToken')


//Register User

exports.registerUser = catchAsyncError(async (req , res , next)=>{
    const {name , email , password} = req.body;
    
    const user = await User.create({
        name , email , password ,  avatar: {
            public_id: "sample",
            url: "sample"
        }
    })

    sendToken(user , 201 , res)

})

//Login

exports.loginUser = catchAsyncError(async (req , res, next)=>{
    const {email , password} = req.body;

    if(!email || !password) {
        return next()
    }
})
