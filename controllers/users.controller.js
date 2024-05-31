const Users = require('../models/users.model');
const passwordEncrypte = require('../controllers/passwordEncryption');
const bcrypt = require('bcrypt');
const mailService = require('../utils/mailservice');
const { generateToken } = require('../services/base.service');


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
      const user = await Users.findOne({ email: email});

    password =   passwordEncrypte.comparePassword(user.password,password)
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


const Register = async (req, res) => {
    try {
        const user = { firstName, lastName, email, password, tel } = req.body;
        if (!firstName || !lastName || !email || !password || !tel) {
            res.status(401).json("corrupted payload");
            return user
        }

        // hashing password 
        password = passwordEncrypte.hashPassword(password);

        //generation of otp
        const otp = Math.floor(1000 + Math.random() * 9000);
        const otpExpier = new Date();
        let expir = otpExpier.setMinutes(otpExpier.getMinutes() + 5);


        //creation of user in db
        const createdUser = await Users.create({ firstName, lastName, email, password, tel, otp, otpExpier:expir });

        //generation of apiKey
        let apiKey

        //IIFE to generate apikey
        (async function () {
            let k = await window.crypto.subtle.generateKey(
                { name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
            const jwk = await crypto.subtle.exportKey("jwk", k)
            console.log(jwk.k);
                apiKey=jwk.k
           
        })()
      
        const message = `Please verify this account belongs to you. Code:  ${otp}`
        //sending message to user at his email for email verification
        mailservice.send(createdUser.email,message);
         return res.status(201).json({
                error: 'false',
                status_code: 201,
                message: 'user created successfully !!!',
                api_key : apiKey
            });

    }
    catch (error) {
            console.log(error.message);
    }


}



module.exports = { Register,Login };