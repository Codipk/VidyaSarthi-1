const express = require('express');
const router = express.Router();

// Import the required controllers and middleware functions
const {
  login,
  signup,
  sendotp,
  changePassword,
} = require('../controllers/Auth');

const {
  resetPassword,
  resetPasswordToken,
} = require('../controllers/ResetPassword');

const { auth } = require('../middlewares/auth');


// Routes for Login, Signup, and Authentication
// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

//Router for user Login
router.post("/login", login);
//ROuter for Signup
router.post("/signup", signup);
//router for sendOtp
router.post("/sendotp", sendotp);
//router for changing password
router.post("/changepassword", auth, changePassword);


// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

//Route for generating Reset Password Token
router.post("/reset-password-token", resetPasswordToken);
// Route for resetting user's password after verification
router.post("/reset-password", resetPassword);

//Export the router for use in the main application
module.exports = router;