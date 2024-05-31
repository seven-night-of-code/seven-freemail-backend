const crypto = require('crypto');
const mailService = require('../utils/mailservice')
const Users = require('../models/users.model')
const { error, log } = require('console');
const { set } = require('../models/forgot-password.model');
const { generateToken } = require('../services/base.service');
const { comparePassword,hashPassword } = require('../services/passwordEncryption');

const createOtp = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const otpExpire = new Date();
    let expir = otpExpire.setMinutes(otpExpire.getMinutes() + 5);
    return {
        otp,otpExpire:expir
    }
}

const Login = async (req,res) => {

    try {
        // getting users email and password
        const  {email,password} = req.body;

        // if no email or password exists, return a 401 
      if (!email || !password) {
        return res.status(401).json({
            error: true,
            statusCode: 401,
            message: 'Invalid Login'
        })
      }
      // find user with provided email
      const user = await Users.findOne({ email: email});

      // comparing passwords
    password =  comparePassword(user.password,password)
    if(password === false){
        return res.status(400).json({
            error: true,
            statusCode: 400,
            data:{
                message: 'Invalid Login'
            }
        })
    }

   const token = generateToken(email,user._id);

      return res.status(201).json({
        error: false,
        statusCode: 201,
        data: {
            token:token,
            message:'successfull login',
            user:user 
        }
    })
    } catch (error) {
        return res.status(401).json({
            error: true,
            statusCode: 401,
            data:{
                message: error.message
            }
        });
    }
}


const Register = async (req, res) => {
    try {
        const user = { firstName, lastName, email, password, tel } = req.body;
        if (!firstName || !lastName || !email || !password || !tel) {
            return res.status(401).json({
                error: true,
                statusCode: 401,
                data:{
                    message:"Corrupted Payload"
                }
            });
        }

        // hashing password 
        password = hashPassword(password);

        //generation of otp
        const {otp,otpExpire} = createOtp();


        //creation of user in db
        const createdUser = await Users.create({ firstName, lastName, email, password, tel, otp, otpExpier });

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
        console.log(apiKey);
        const message = `Please verify this account belongs to you. Code:  ${otp}`

        //sending message to user at his email for email verification
        mailService.send(createdUser.email,message);
         return res.status(201).json({
                error: false,
                statusCode: 201,
                message: 'user created successfully !!!',
                apiKey 
            });

    }
    catch (error) {
            console.log(error.message);
    }


}

const confirm_email = async (req, res) => {
    try {
        const { email } = req.body;
    
      //generation of otp
      const otp = Math.floor(1000 + Math.random() * 9000);
      const otpExpier = new Date();
      let expir = otpExpier.setMinutes(otpExpier.getMinutes() + 5);

        const updated = await Users.findOneAndUpdate(
        {email},
        { $set: { "otp": otp, "otpExpire": expir } },
      )

      const subject = `Your password reset  Code is:  ${otp}`
        mail_service.send(email, subject)
    } catch (error) {
        res.status(500).json({
            status:500,
            error:error.message
        })
    }
      
}


const update_password = async (req, res) => {
    let { password, confirmPassword, token } = req.body;
    try {
        
        if (!token) {
            return res.json({
                status: false,
                message: "No token Provided"
            })
        }
        if (password !== confirmPassword) {
            return res.json({
                status: false,
                message: "passwords do not match"
            })
        }

        const obj = await user.findOne({ otp: token });

        console.log(obj, typeof (Number(token)), Number(token), typeof (obj.otp), obj.otp);
        if (obj.otpExpire < Date.now()) {
            return res.json({
                status: false,
                message: "Token expired"
            })
        }

        if (obj.otp !== Number(token)) {
            return res.json({
                status: false,
                message: "Invalid Token"
            })
        }

        const updated = await user.findOneAndUpdate(
            { otp: token },
            { $set: { "password": encryptPassword(password) } },
            { returnNewDocument: true }
        )
        await mailService.send(updated.email, "Password Reset", `Dear User Your password has been resseted with success use it to login henceforth`)
        res.status(200).json({
            status: true,
            message: "Password resseted successfully"
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })

    }
}


module.exports = { confirm_email, update_password,Register,Login}