const Course = require('../models/Course');
const Tag = require('../models/Tag');
const User = require('../models/Userr');
const { uploadImageToCloudinary } = require('../utils/imageUploader')


//createCourse Handler Function
exports.createCourse = async (req, res) => {
  try {
    //fetch data
    const { courseName, courseDescription, whatYouWillLearn, price, tag } = req.body;//here tag is tagid-> see couseSchema
    //get thumbnail
    const thumbnail = req.files.thumbnailImage;
    //validation
    if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }
    //check for instructor
    const userId = req.user.id;
    const instructorDetails = await User.findById({ userId });
    console.log("Instructor Details : ", instructorDetails);
    //TODO-> verify that userId and instructorDeatais._id is same or not

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: 'Instructor Details Not Found',
      });
    }
    //check whether tag is valid or not
    const tagDetails = await Tag.findById(tag);
    if (!tagDetails) {
      return res.status(404).json({
        success: false,
        message: 'Tag Details Not Found',
      });
    }
    //upload image to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);


    //create a entry for new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag: tagDetails._id,
      thumbnail: thumbnailImage.secure_url,

    });
    //update user -> who is user -> instructor
    //add this course to userSchema of instructor
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true },
    );

    //************************************************ Update tagSchema*****************************************************************************************************************
    //HW
    //return response
    return res.status(200).json({
      success: true,
      message: 'Course Created Successfully',
      data: newCourse,
    });


  } catch (error) {
    console.log("Error in creating course : ", error);
    res.status(500).json({
      success: false,
      meassge: 'Error in creating Courses',
      error: error.meassge,
    });

  }
}



//getAllCourse Handler function

exports.getAllCourse = async (req, res) => {
  try {
    //TODO -> change the below statement incremently
    const allCourse = await Course.find({})

    return res.status(200).json({
      success: true,
      message: 'All data fetched successfully',
      data: allCourse,
    })

  } catch (error) {
    console.log("Error in fetching all course: ", error);
    res.status(500).json({
      success: false,
      meassge: 'Error in fetching Courses',
      error: error.meassge,
    });

  }
}
