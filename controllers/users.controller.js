const users = require('../models/users.model');

const Register = async(req , res , next ) =>{
    try {
        const user = {firstName , lastName , email , password , tel} = req.body;
        if(!firstName || !lastName || !email || !password || !tel){
            res.status(401).json("corrupted payload");
            return user
        }
        const createdUser = await users.create({firstName , lastName , email , password , tel});
        
                // return res.status(201).json({
                //     error : 'false', 
                //     status_code : 201,
                //     message : 'user created successfully !!!'
                // });
                return createdUser 

    }
     catch (error) {
    //     console.log(error);
    }
}



module.exports = { Register };