const token = require('../services/base.service')
const User = require('../models/users.model')
export const guard = async (req, res, next) => {

    try {
        const { email } = req.body;

        if (!email) {
            res.status(400).json({
                status:400,
                message:"no email address"
            })
        } 

        const user = await User.findOne({ email: email})
        if (!user) {
            res.status(404).json({
                status:404,
                message:"user not found"
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