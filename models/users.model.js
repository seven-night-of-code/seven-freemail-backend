const mongoose = require('mongoose');
const schema = mongoose.Schema;
const User = new schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        required: false,
        default: 'USER'
    },
    otp:{
        type:Number,
        required:false,
        default:0
    },
    otpExpire:{
        type:Number,
        required:false,
        default:0
    },
    imageUrl:{
        type:String,
        required:false,
        default:"DP"
    }
},
{
    timestamps:true
},
);

const userModel = mongoose.model("Users",User);
module.exports = userModel;
