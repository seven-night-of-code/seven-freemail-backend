const mongoose = require('mongoose');
const schema = mongoose.Schema;
const user = new schema({
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
    tel:{
        type:Number,
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
    },
    api_key: {
        type: String,
        required: false,
    
    },
    api_status: {
        type: String,
        required: false,
        default: 'active',
        enum: ['active', 'inactive'],
    },
    verified: {
        type: Boolean,
        default:false
    }
},
{
    timestamps:true
},
);
    const userModel = mongoose.model("Users",user);
module.exports = userModel;
