const User = require("../models/User");
const mailSender = require('../utils/mailSender');
require('dotenv').config();



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
        message: 'User is not Registered with this email',
      });
    }
    //generate token -> this token will be inserted in DB and then using this token
    //we will get the user and then reset the password 
    const token = crypto.randomUUID();//for example "36b8f84d-df4e-4d49-b662-bcde71a8764f"
    const updateDetails = await User.findOneAndUpdate({ email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000, //5 min
      }, { new: true });//with this new:true -> updated data is returned



    // we are running our frontend on port 3000 so we use 3000 in url
    const frontendPort = process.env.FRONTEND_PORT;
    //create url
    const url = `http://localhost:${frontendPort}/update-password/${token}`;

    //send mail containing url
    await mailSender(email, "Password Reset Link ", `Password Reset Link : ${url}`);

    //return response
    return res.status(200).json({
      success: true,
      message: 'Email sent successfully . Please check Email and Change password',
    });

  } catch (error) {

    console.log("Error in ResetPassword Token : ", error);
    return res.status(500).json({
      success: false,
      message: 'Something went Wrong in ResetPasswordToken'
    });
  }

}




//resetPassword
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
    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.json({
        success: false,
        message: "Token is expired. Please regenerate your Token",
      });
    }
    //hash password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Error inn hashing Password during reset time',
      });
    }
    //password update
    await User.findOneAndUpdate({ token: token },
      { password: hashedPassword, },
      { new: true });//with this new:true -> updated data is returned

    //return response
    return res.status(200).json({
      success: true,
      message: 'Password reset Successfully',
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error in reset password'
    })
  }
}