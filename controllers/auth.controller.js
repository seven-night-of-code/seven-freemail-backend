const generate_token = require('../services/base.service');
const crypto = require('crypto');
const mail_service = require('../utils/mailservice')
const Users = require('../models/users.model')
const { error } = require('console');



const confirm_email = (req, res) => {
    const { email } = req.body;
    if (Users[email]) {
        const token = crypto.randomBytes(2).toString('hex');
        Users[email].resetToken = token;
        const subject = `Your verifiction code is ${token}`
        
        mail_service.send(email, subject)

        // {
        //     from: "sevenfreemail@testemail.com",
        //     to: email,
        //     subject: 'Password Reset',
        //     text: `Click the following link to reset your password: ${port}/${token}`,
        // };
        // transporter.sendMail(mailOptions, (error, info) => {
        //     if(error) {
        //         console.log(error);
        //         res.status(500).send('Error sending email');
        //     } else {
        //         console.log(`Email sent: ${info.response}`);
        //         res.status(200).send('Check your email for instructions on resetting your password')
        //     }
        // });
        
    }
    else {
        res.status(404).send('Invalid email or expired token');
      }
}


const update_password = (req, res) => {
    const { token, password } = req.body;
    const user = Users.find(user => user.resetToken === token);
    if (user) {
        user.password = password;
        delete user.resetToken;
        res.status(200).send('Password updated successfully')
    } else {
        res.status(400).send('Invalid Token')
    }
}

module.exports = { confirm_email, update_password }