const bcrypt = require('bcrypt');


function hashPassword(password){
        try {
            const salt = bcrypt.genSaltSync(parseInt(10));
            return bcrypt.hashSync(password , salt);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    function comparePassword(hash , password){
        try {
            return bcrypt.compareSync(password , hash);
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    module.exports = { hashPassword , comparePassword };