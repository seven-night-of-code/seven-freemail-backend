const token = require('../services/base.service');
const User = require('../models/users.model');

const guards = {
    
  headerFxn : (req, res, next) => {
    const header = req.headers["authorisation"];
    if (!header) {
        return res.status(401).json({
            status: false,
            error: {
                message: 'Auth headers not provided in the request.'
            }
        });
    }

    const token = header.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            status: false,
            error: {
                message: 'No token provided'
            }
        });
    }

    let validToken;

    try {
        validToken = jwt.verify(token, process.env.JWTSECRET);
    }
    catch (error) {
        if (error instanceof JsonWebTokenError) {
            return res.status(401).json({
                status: 1,
                message: "Invalid access"
            })
        }

        return res.status(401).end();
    }
    res.json(validToken);
    next();
},

 guard : async (req, res, next) => {

    try {
        const { email } = req.body;

        if (!email) {
           return res.status(400).json({
                status:400,
                message:"no email address"
            })
        } 

        const user = await User.findOne({email})
        if (!user) {
          return   res.status(404).json({
                status:404,
                message:"Invalid Login"
            })
        }
        next();


    } catch (error) {
        return res.status(500).json({
            status:505,
            message:"internal server error"
        })
    }
}
}

module.exports = {guards}