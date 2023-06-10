const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const OTPSchema = new mongoose.Schema({

  email: {
    type: String,
    requried: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60, // 5 min
  }

});
//function -> to send the email
async function sendVerificationEmail(email, otp) {
  try {
    ///error may be occured here by invalid input parameters
    const mailResponse = await mailSender(email, "Verification Email from VidyaSarthi", otp);
    console.log("Email Sent Successfully : ", mailResponse);
  } catch (error) {
    console.log("Error Occured while sending mails ", error);
    throw error;
  }
}

OTPSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
})

module.exports = mongoose.model("OTP", OTPSchema);