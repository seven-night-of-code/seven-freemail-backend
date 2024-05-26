const users = require('../models/users.model');

const register = async(req , res , next ) =>{
    try {
        const user = new users({
            firstName : req.body.firstName , 
            lastName : req.body.lastName , 
            email : req.body.email,
            password : req.body.password,
            role : req.body.role,
            tel : req.body.tel
        });
        await user.save();
    } catch (error) {
        
    }
}