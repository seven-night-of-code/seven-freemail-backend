const User = require('../models/Users');
const token = require('../services/base.service.generateToken')

const Login = async (req, res, next) => {

    try {
        const User = ({
        email : req.body.email,
        password : req.body.password
      });

      if (email && password === req.body.email && req.body.password) {
        
      }

      return res.status(201).json({
        error: false,
        status_code: 201,
        message: 'successfully login'
    })
    } catch (error) {
        return res.status(401).json({
            error: true,
            status_code: 401,
            message: error.message
        });
    }
}



const Register = async(req , res , next ) =>{
    try {
        const User = {firstName , lastName , email , password , tel} = req.body;
        if(!firstName || !lastName || !email || !password || !tel){
            res.status(401).json("corrupted payload");
            return User
        }
        const createdUser = await Users.create({firstName , lastName , email , password , tel});
        
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