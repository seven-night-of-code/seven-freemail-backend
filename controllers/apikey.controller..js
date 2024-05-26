const User = require("../models/users.model");
const sendMail = require("../utils/mailservice");
const apiToggle = async (req, res, next) => {
  const userid = req.params.id;
  console.log(userid);
  const user = await User.findById(userid);
  console.log(user);
  if (user) {
    if (user.api_status == "active") {
      user.api_status = "inactive";
    } else {
      user.api_status = "active";
    }
    await user.save();
    res.status(200).json({
      message: "api status updated",
    });
  } else {
    res.status(404).json({
      message: "user not found",
    });
  }
};
const generateRandom = (n) => {
  return Math.floor(Math.random() * (9 * Math.pow(10, n))) + Math.pow(10, n);
};
const forgotPassword = async (req, res, next) => {
  const body = req.body;
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const otp = generateRandom(5);
    user.otp = otp;
    await user.save();
    const content = `
        <h1>Hi ${user.firstName} ${user.lastName}</h1>
        <p>Your OTP is ${user.otp}</p>`;
    const send = await sendMail.send(
      req.body.email,
      "Forgot Password",
      content
    );
    res.status(200).json({
      message: "email sent",
    });
  } else {
    res.status(404).json({
      message: "user not found",
    });
  }
};
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
const resetPassword = async (req, res, next) => {
  const body = req.body;
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    user.password = req.body.password;
    user.save();
    const content = `
        <h1>Hi ${user.firstName} ${user.lastName}</h1>
        <p>Your password has been changed successfully</p>`;
    const send = await sendMail(req.body.email, "Forgot Password", content);
    res.status(200).json({
      message: "Password changed successfully",
    });
  } else {
    res.status(404).json({
      message: "user not found",
    });
  }
};
module.exports = { apiToggle, forgotPassword, codeValidation, resetPassword };
