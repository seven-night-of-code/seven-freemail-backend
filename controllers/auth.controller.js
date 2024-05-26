require('dotenv').config()
const nodemailer = require("nodemailer");
const generate_token = require('../services/base.service');
const crypto = require('crypto');
const { error } = require('console');

const port = process.env.MONGO_UR

const reset_password = (req, res) => {
    const { email } = req.body;
    if (users[email]) {
        const token = crypto.randomBytes(20).toString('hex');
        users[email].resetToken = token;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com'
            }
        });
        const mailOptions = {
            from: "sevenfreemail@testemail.com",
            to: email,
            subject: 'Password Reset',
            text: `Click the following link to reset your password: ${port}/${token}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                console.log(error);
                res.status(500).send('Error sending email');
            } else {
                console.log(`Email sent: ${info.response}`);
                res.status(200).send('Check your email for instructions on resetting your password')
            }
        });
        
    }
}