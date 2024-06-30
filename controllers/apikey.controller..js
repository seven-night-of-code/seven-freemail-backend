const User = require("../models/users.model");
const sendMail = require("../utils/mailservice");
const apiToggle = async (req, res, next) => {
  const userid = req.params.id;

  const user = await User.findById(userid);
  if (!user) {
    return   res.status(404).json({
      message: "user not found",
    });
  }
    if (user.apiStatus === "active") {
      user.apiStatus = "inactive";
    } else {
      user.apiStatus = "active";
    }
    await user.save();
    res.status(200).json({
      message: "api status updated",
    });
  }

const codeValidation = async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (user.otp == req.body.code) {
      res.status(200).json({
        message: "code correct",
      });
    } else {
      res.status(404).json({
        message: "code incorrect",
      });
    }
  } else {
    res.status(404).json({
      message: "user not found",
    });
  }
};
module.exports = {apiToggle,codeValidation};
