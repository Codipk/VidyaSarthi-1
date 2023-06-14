const User = require('../models/User');
const Profile = require('../models/Profile');
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

//sendOTP
exports.sendOTP = async (req, res) => {

  try {
    //fetch email from req body
    const { email } = req.body;

    //email validation

    //if user already registere d -> return already registered
    const checkUserPressent = await User.findOne({ email });
    if (checkUserPressent) {
      return res.status(401).json({
        success: false,
        message: 'User already Registered',
      })
    }

    //create otp
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP is : ", otp);
    //check whether it is unique or not
    let result = await OTP.findOne({ otp: otp });
    while (result) {
      var otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }//NOTE this is brute force we need any service that always generates the unique otp
    //never use dbcall inside loop ,this is very bad code ...needed to be optimised 
    const otpPayload = { email, otp };
    //create an Entry in DB for OTP
    const otpBody = await OTP.create(otpPayload);
    console.log("OTP BODY : ", otpBody);

    return res.status(200).json({
      success: true,
      message: 'OTP Sent  Successfully',
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//SignUp

exports.signUp = async (req, res) => {
  //stpes---->
  try {
    //1. fetch data from req.body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp
    } = req.body;
    //2. validate the data
    if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
      return res.status(403).json({
        success: false,
        message: 'All Fields are Required',
      })
    }
    //3.match password and confirmed password 
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: true,
        message: 'Password and ConfirmedPassword Does not match',
      })
    }
    //4. check user already exit
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: true,
        message: 'User already Registered',
      })
    }
    //5 . find most recent otp from the database
    const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    //*****************HW -> find sort({ createdAt: -1 }).limit(1) ?****************************************************** */
    console.log("Recent OTP is : ", recentOtp);

    //6. validate the otpb
    if (recentOtp.length == 0) {
      return res.status(400).json({
        success: false,
        message: 'OTP is not Found ',
      });
    }
    else if (otp != recentOtp.otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTPss',
      });
    }
    //7. hash the password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Error inn hashing Password',
      });
    }

    //8. create entry in database
    //8.1 create profile
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      additonalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    //resturn response
    return res.status(200).json({
      success: true,
      message: 'User is Registered Successfully',
      user,
    })

  } catch (error) {
    console.log("Error in Registration : ", error);
    return res.status(500).json({
      success: false,
      message: 'User Can not be Registered. Please try again ',

    })
  }
}


//LogIn
exports.login = async (req, res) => {
  //Steps ->
  try {
    //1. fetch data from req.body
    const { email, password } = req.body;

    //2.Validate data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: 'All fieds are neccessary',
      });
    }

    //3. check user if AlreadyExist
    const user = await User.findOne({ email }).populate("additionalDetails");//ye wale use me saaya database ka details hai
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not registered . Please SignUp firstly'
      })
    }

    //4. generate JWT tokens after password matching
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: accountType,
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;
      //5. create Cookie and send Response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3days
        httpOnly: true,
      }
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: 'Logged in Successfully',
      });
    }
    else {
      return res.status(401).json({
        success: false,
        message: 'Password Incorrect'
      });
    }



  } catch (error) {
    console.log("Error in LogIn : ", error);
    return res.status(500).json({
      success: false,
      message: 'LogIn failure. Please Try Again',
    })
  }
};


//changePassword

exports.changePassword = async (req, res) => {
  //steps->>>
  //1.get data from req.body

  //2.get oldPassword , newpassword , confirmNewPassword
  //3. perfom validation
  //4. update password in DB
  //5. send Mail -> changed password
  //6. return response
}




