const catchAsyncError = require('../middleware/catchAsyncError')
const User = require('../model/userModel')
const Product = require('../model/productModel')
const sendToken = require('../utils/jwtToken')
const ErrorHandler = require('../utils/errorHandler')



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
        return next(new ErrorHandler("Please Enter Email & Password" , 400))
    }

    const user = await User.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHandler("Invalid Email or Password" , 401))
    }

    const isPasswordMatch = user.comparePassword(password)

    if(!isPasswordMatch) {
        return next(new ErrorHandler("Invalid Email or Password" , 401))
    }

    sendToken(user , 200 , res)

    
})

//LogOut

exports.logOut = catchAsyncError(async (req , res, next)=>{
    res.clearCookie("token" , {
        httpOnly : true
    })

    res.status(200).json({
        success : true,
        message : "Logged Out"
    })
})


// Get User Details Profile

exports.getUserDetails = catchAsyncError(async (req , res , next)=>{
    const user = await User.findById(req.user.id)
    
    res.status(200).json({
        success : true,
        user
    })

})


// Update user Password

exports.updatePassword = catchAsyncError(async (req , res, next)=>{
    const {oldPassword , newPassword , confirmPassword} = req.body
    const user = await User.findById(req.user.id).select('+password');

    const isPasswordMatch = await user.comparePassword(oldPassword)

    if(!isPasswordMatch){
        return next(new ErrorHandler("old password is does not match" , 400))
    }

    if(newPassword !== oldPassword){
        next(new ErrorHandler("new password and confirm password does not match" , 400))
    }

    user.password = newPassword;

    await user.save({validateBeforeSave : false})

    sendToken(user , 200 , res)

})

//update user Profile

exports.updateUserProfile = catchAsyncError(async(req , res , next)=>{

    const newUserData = {
        name : req.body.name,
        email : req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id , newUserData)

    res.status(200).json({
        success : true,
        user
    })


})


//get all users (admin)

exports.getAllUsers = catchAsyncError(async (req ,res , next)=>{
    const users = await User.find({})

    res.status(200).json({
        success : true,
        users
    })
})


//Get user by id (admin)

exports.getSingleUSer = catchAsyncError(async (req , res , next)=>{
    const userId = req.params.id
    const user = await User.findById(userId)

    if(!user){
        return next(new ErrorHandler(`User with user id ${userId} does not exist` , 404))

    }

    res.status(200).json({
        success : true,
        user
    })

})

//Update user role (admin)

exports.updateUserRole = catchAsyncError(async (req , res  , next)=>{

    const newUserData = {
        name : req.body.name,
        email : req.body.name,
        role : req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id , newUserData)

    if(!user){
        return next(new ErrorHandler(`User does not exist with ID : ${req.params.id}` , 404))
    }

    res.status(200).json({
        success: true
    })

})

//Delete User (admin)

exports.deleteUser = catchAsyncError(async (req , res, next)=>{

    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`User does not exist with ID : ${req.params.id}` , 404))
    }

    await User.deleteOne({_id : req.params.id})

    res.status(200).json({
        success : true,
        message : 'user deleted'
    })

})

// create a product review

exports.createProductReview =  catchAsyncError(async (req , res , next)=>{
    const {rating , comment , productId} = req.body;

    const review = {
        user: req.user._id,
        name : req.user.name,
        rating : Number(rating),
        comment
    }

    const product = await Product.findById(productId)

    let isReviewed = false



})