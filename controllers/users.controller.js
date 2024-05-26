const Users = require('../models/users.model');
const passwordEncrypte = require('../controllers/passwordEncryption');
const bcrypt = require('bcrypt');
const MailService = require('../utils/mailservice');
const mailservice = require('../utils/mailservice');

const Register = async (req, res, next) => {
    try {
        const user = { firstName, lastName, email, password, tel } = req.body;
        if (!firstName || !lastName || !email || !password || !tel) {
            res.status(401).json("corrupted payload");
            return user
        }
        password = passwordEncrypte.hashPassword(password);
        const otp = Math.floor(1000 + Math.random() * 9000);
        const otpExpier = new Date();
        let expir = otpExpier.setMinutes(otpExpier.getMinutes() + 5);

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

    }
    catch (error) {
            console.log(error.message);
    }


}



module.exports = { Register };