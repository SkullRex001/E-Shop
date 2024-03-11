const mongoose  = require('mongoose')

const productSchema = mongoose.Schema({
    name : {
        type : String, 
        required : [true  , "Please Enter product name"],
        trim : true
        //will test it for other field later
    },

    description: {
        type : String ,
        required : [true , "Please enter the product description"]
    },

    price : {
        type : Number,
        required : [true , "Please Enter product Price"],
        maxLength : [8 , "Price cannot exceed 8 characters"]
    },

    ratings : {
        type : Number,
        default : 0
    },

    images:[ {
        public_id: {
            type : String , 
            required : true
        }, 

        url: {
            type : String , 
            required : true
        }

    }], 


    category : {
        type : String,
        required : [true , "Please enter product category"]
    },

    Stock : {
        type : Number,
        required : [true , "Please Enter product Stock"],
        maxLength : [4 , "Stock cannot exceed 4 characters"],
        default : 1
    },

    numberOfReviews : {
        type : Number,
        default : 0
    },

    reviews : [
        {
            user : {
                type : mongoose.Schema.ObjectId,
                ref : "User",
                require : true
            },

            name : {
                type : String,
                required : true
            },

            rating : {
                type : Number ,
                required : true 
            },

            comment :{
                type : String,
                required : true
            }
        }
    ],

    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required : true
    },

    createdAt : {
        type : Data,
        default : Date.now
    }

})

module.exports = mongoose.model('Product' , productSchema)