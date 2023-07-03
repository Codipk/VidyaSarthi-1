const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
require("dotenv").config();

//resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
  //get email from bdoy
  //check usr for this email , email validation
  //generate token
  //update user by adding token and expiration time
  //create url
  //send mail containing url
  //return response

  try {
    //get email from bdoy
    const email = req.body.email;
    //check usr for this email , email validation
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: "User is not Registered with this email",
      });
    }
    //generate token -> this token will be inserted in DB and then using this token
    //we will get the user and then reset the password
    const token = crypto.randomBytes(20).toString("hex"); //for example "36b8f84d-df4e-4d49-b662-bcde71a8764f"
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000, //5 min
      },
      { new: true }
    ); //with this new:true -> updated data is returned

    // we are running our frontend on port 3000 so we use 3000 in url
    const frontendPort = process.env.FRONTEND_PORT;
    console.log("DETAILS", updatedDetails);
    //create url
    const url = `http://localhost:${frontendPort}/update-password/${token}`;

    //send mail containing url
    await mailSender(
      email,
      "Password Reset",
      `Your Link for email verification is ${url}. Please click this url to reset your password.`
    );

    //return response
    return res.status(200).json({
      success: true,
      message:
        "Email sent successfully . Please check Email and Change password",
      token,
    });
  } catch (error) {
    console.log("Error in ResetPassword Token : ", error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Something went Wrong in ResetPasswordToken",
    });
  }
};

//resetPassword
//TODO ->need of more logic ek hi token se 2 bar paassword change kr dia...
//isko only once krna pdega
exports.resetPassword = async (req, res) => {
  try {
    //fetch data
    //validation
    //get user details
    //if no entry -> invalid token
    //token time check
    //hash password
    //password update
    //return response

    //fetch data
    const { password, confirmPassword, token } = req.body; //token is inserted in body by frontend
    //validation
    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Password and Confrim Password Doesn't match ",
      });
    }
    //get user details
    const userDetails = await User.findOne({ token: token });
    //if no entry -> invalid token
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is invalid",
      });
    }
    //token time check
    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.status(403).json({
        success: false,
        message: `Token is Expired, Please Regenerate Your Token`,
      });
    }
    //hash password
    const encryptedPassword = await bcrypt.hash(password, 10);
    //password update
    await User.findOneAndUpdate(
      { token: token },
      { password: encryptedPassword },
      { new: true }
    ); //with this new:true -> updated data is returned

    //return response
    return res.status(200).json({
      success: true,
      message: "Password reset Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Some Error in Updating the Password`,
    });
  }
};
