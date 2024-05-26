<<<<<<< HEAD
const Users = require('../models/users.model');
const passwordEncrypte = require('../controllers/passwordEncryption');
=======
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


>>>>>>> 7cd43b00b5a9fc1858d1506e6356232248d88185
const bcrypt = require('bcrypt');
const MailService = require('../utils/mailservice');
const mailservice = require('../utils/mailservice');

const Register = async (req, res, next) => {
    try {
<<<<<<< HEAD
        const user = { firstName, lastName, email, password, tel } = req.body;
        if (!firstName || !lastName || !email || !password || !tel) {
=======
        const User = {firstName , lastName , email , password , tel} = req.body;
        if(!firstName || !lastName || !email || !password || !tel){
>>>>>>> 7cd43b00b5a9fc1858d1506e6356232248d88185
            res.status(401).json("corrupted payload");
            return User
        }
        password = passwordEncrypte.hashPassword(password);
        const otp = Math.floor(1000 + Math.random() * 9000);
        const otpExpier = new Date();
        let expir = otpExpier.setMinutes(otpExpier.getMinutes() + 5);

<<<<<<< HEAD
        const createdUser = await Users.create({ firstName, lastName, email, password, tel, otp:otp,otpExpier:expir });
        let apiKey
        (async function () {
            let k = await window.crypto.subtle.generateKey(
                { name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
            const jwk = await crypto.subtle.exportKey("jwk", k)
            console.log(jwk.k);
                apiKey=jwk.k
           
        })()
      
        const message = `use this code to verify account ${otp}`
        mailservice.send(createdUser.email,)
         return res.status(201).json({
                error: 'false',
                status_code: 201,
                message: 'user created successfully !!!',
                api_key : apiKey
            });
=======
                // return res.status(201).json({
                //     error : 'false', 
                //     status_code : 201,
                //     message : 'User created successfully !!!'
                // });
                return createdUser 
>>>>>>> 7cd43b00b5a9fc1858d1506e6356232248d88185

    }
    catch (error) {
            console.log(error.message);
    }


}

// const confirmEmail = async(req , res , next) =>{

// }



module.exports = { Register, Login };