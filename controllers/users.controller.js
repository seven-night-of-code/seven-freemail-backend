const User = require('../models/Users');
const {generateToken} = require('../services/base.service');
const passwordEncryption = require("../controllers/passwordEncryption")

const Login = async (req, res, next) => {

    try {
        const  {email,password} = req.body;

      if (!email && !password) {
        return res.status(401).json({
            error: true,
            status_code: 401,
            message: 'Invalid Login'
        })
      }
      const user = await User.findOne({ email: email});

    password =   passwordEncryption.comparePassword(user.password,password)
    if(password === false){
        return res.status(400).json({
            error: true,
            status_code: 400,
            message: 'Invalid Login'
        })
    }

   const token = generateToken(email,user._id);

      return res.status(201).json({
        error: false,
        status_code: 201,
        data: {
            token:token,
            message:'successfull login',
            user:user 
        }
    })
    } catch (error) {
        return res.status(401).json({
            error: true,
            status_code: 401,
            message: error.message
        });
    }
}


const bcrypt = require('bcrypt');

const Register = async(req , res , next ) =>{
    try {
        const User = {firstName , lastName , email , password , tel} = req.body;
        if(!firstName || !lastName || !email || !password || !tel){
            res.status(401).json("corrupted payload");
            return User
        }
        const createdUser = await users.create({firstName , lastName , email , password , tel});

                // return res.status(201).json({
                //     error : 'false', 
                //     status_code : 201,
                //     message : 'User created successfully !!!'
                // });
                return createdUser 

    }
     catch (error) {
    //     console.log(error);
    }

   
}



module.exports = { Register, Login };