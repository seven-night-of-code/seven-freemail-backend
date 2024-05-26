const User = require('../models/users');

const Login = async (req, res, next) => {

    try {
        const user = new User({
        email : req.body.email,
        password : req.body.password
      });
      await user.save();

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

module.exports = { Login }