require('dotenv').config()
const jwt = require('jsonwebtoken');

const generateToken = (email, userId) => {
    const user = {email, userId}
    const secret_key = process.env.JWT_SECRET;
    const options = {
        expiresIn: '1hr'
    }
    const token = jwt.sign(user, secret_key, options);
    return token;
};

module.exports = { generateToken }