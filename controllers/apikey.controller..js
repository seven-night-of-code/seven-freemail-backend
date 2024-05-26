const User = require('../models/users.model')
const apiToggle = async (req, res, next) => { 

    const userid = req.params.id 
    console.log(userid)
    const user = await User.findById(userid)
    console.log(user);
    if(user){
        
        if (user.api_status == 'active') {
            user.api_status = 'inactive'
        }
        else {
            user.api_status = 'active'
        }
        await user.save()
        res.status(200).json({
            message: 'api status updated'
        })
    }
    else {
        res.status(404).json({
            message: 'user not found'
        })
    }
}
const forgotPassword = async (req, res, next) => { 
    const body = req.body
    const user = await User.findOne({email: req.body.email})
    if(user){
        //send email code and save code in the model
        res.status(200).json({
            message: 'email sent'
        })
    }
    else {
        res.status(404).json({
            message: 'user not found'
        })
    }
}
const codeValidation = async (req, res) => { 
    const body = req.body
    const user = await User.findOne({email: req.body.email})
    if(user){
        if(user.code == req.body.code){
            res.status(200).json({
                message: 'code correct'
            })
        }
        else {
            res.status(404).json({
                message: 'code incorrect'
            })
        }
    }
    else {
        res.status(404).json({
            message: 'user not found'
        })
    }
}
const resetPassword = async (req, res, next) => { 
    const body = req.body
    const user = await User.findOne({email: req.body.email})
    if(user){
        user.password = req.body.password
        user.save()
        res.status(200).json({
            message: 'Password changed successfully'
        })
    }
    else {
        res.status(404).json({
            message: 'user not found'
        })
    }
}
module.exports = { apiToggle, forgotPassword, codeValidation,resetPassword}