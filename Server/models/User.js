const mongoose = require('mongoose');
//this file has been renamed from user.js
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["Admin", "Instructor", "Student"],
    required: true
  },
  additonalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Profile"
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    }
  ],
  token: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  image: {
    type: String, //url of image
    required: true,
  },
  courseProgress: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courseProgress",
    }
  ],

});


module.exports = mongoose.model("User", userSchema);