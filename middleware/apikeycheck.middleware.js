const User = require("../models/users.model");

checkKeyStatus = async (req, res, next) => {
  const userid = req.params.id;
  const user = await User.findById(userid);
  if (user) {
    if (user.api_status == "active") {
      next();
    } else {
      res.status(401).json({
        message: "Your api key is not active",
      });
    }
    }
    return res.status(404).json({ message: "user not found" })
};
module.exports = checkKeyStatus
