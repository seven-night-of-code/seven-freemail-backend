const crypto = require('crypto');
const mailService = require('../utils/mailservice')
const Users = require('../models/users.model')
const { generateToken } = require('../services/base.service');
const { comparePassword,hashPassword } = require('../services/passwordEncryption');
const validateUser = async  (email) => {
    const userObtained = await Users.findOne({email});
    if(!userObtained){
         return {status:401}
    }
    return {status:200}
}
const createOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 9000);
    const otpExpire = new Date();
    let expir = otpExpire.setMinutes(otpExpire.getMinutes() + 10);
    return {
        otp,otpExpire:expir
    }
}
const genApikey = () => {
    return crypto.randomBytes(8).toString("hex");
}
genApikey()
const Login = async (req,res) => {

    try {
        // getting users email and password
        let  {email,password} = req.body;

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

        const fromValidateUser = await validateUser(email)
        console.log(fromValidateUser);

        if(fromValidateUser.status === 200) return res.status(409).json({error:true,
            message:"user exists"
        })
        // hashing password 
        password = hashPassword(password);

        //generation of otp
        const {otp,otpExpire} = createOtp();


        //creation of user in db
        const createdUser = await Users.create({ firstName, lastName, email, password, tel, otp, otpExpire });

      
        
        const message = `Please verify this account belongs to you. Code:  ${otp}`

        //sending message to user at his email for email verification
        mailService.send(createdUser.email,message);
         return res.status(201).json({
                error: false,
                statusCode: 201,
                message: 'user created successfully !!!',
            });

    }
    catch (error) {
            console.log(error.message);
    }


}

const confirmAccount =  async (req,res) => {
    try {
        let {email,token} = req.body;
        if(!token || !email){
            return res.status(401).json({
                error: true,
                statusCode: 401,
                data:{
                    message:"Corrupted Payload"
                }
            });
        }
         token = Number(token);
        const userToken = await Users.findOne({email});
        if(!userToken){
            return res.status(401).json({
                error: true,
                statusCode: 401,
                data:{
                    message:"Account not found"
                }
            });
        }
        if(userToken.otp !== token || userToken.otpExpire < Date.now()){
            return res.status(401).json({
                error: true,
                statusCode: 401,
                data:{
                    message:"Error verifying account"
                }
            });
        }
          //generation of apiKey
          let apiKey
          apiKey = genApikey();
        // const verifiedUser = await Users.findOneAndUpdate(
        //     {email},
        //     {$set:{
        //         "verified":true,
        //         "apiKey":apiKey
        //     }}
        // )
        const verifUser = Users.find({email})
        console.log(verifUser);
        verifUser.verified = true
        verifUser.apiKey = apiKey

       await verifUser.save();

        return res.status(201).json({
                verified:true,
                statusCode:201,
                apiKey
            })
    } catch (error) {
        res.status(500).json({
            status:500,
            error:error.message
        })
    }
}

const confirmEmail =  async (req,res) => {
    try {
        let {email} = req.body;
        let {otp,otpExpire} = createOtp();
        const confirmedEmail = await Users.findOneAndUpdate(
            {email},
            {$set:{
                "otp":otp,
                "otpExpire":otpExpire
            }}
        )
        const message = `Please verify this account belongs to you. Code:  ${otp}`

        //sending message to user at his email for email verification
        mailService.send(email,message);
        return res.status(201).json({
                verified:true,
                statusCode:201,
            })
    } catch (error) {
        res.status(500).json({
            status:500,
            error:error.message
        })
    }
}

const updatePassword = async (req, res) => {
    let { password, confirmPassword, token} = req.body;
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

        const obj = await Users.findOne({ otp: token });

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

        const updated = await Users.findOneAndUpdate(
            { otp: token },
            { $set: { "password": encryptPassword(password) } },
            { returnNewDocument: true }
        )
         mailService.send(updated.email, "Password Reset", `Dear User Your password has been resseted with success use it to login henceforth`)
        res.status(200).json({
            status: true,
            message: "Password resseted successfully"
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })

    }
}


module.exports = { confirmAccount, updatePassword,Register,Login}