const Section = require('../models/Section');
const Course = require('../models/Course');


//******************************************createSection*****************************************************\
exports.createSection = async (req, res) => {
  try {
    //data fetch
    //data validate
    //create section
    //update course with section objectID
    //return response

    //data fetch
    const { sectionName, courseId } = req.body;
    //data validate
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: true,
        message: 'All fields are required',
      });
    }

    //create section
    const newSection = await Section.create({ sectionName });
    //update course with section objectID
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        }
      },
      { new: true }, //this will lead to return updated Course
    );
    //Hw-> use populate to replace section/sub-section both in updatedcourseDetails
    //return response
    return res.status(200).json({
      success: true,
      message: 'Section Added Successfully',
      updatedCourseDetails,
    });

  } catch (error) {
    console.log("Error in creating section : ", error);
    return res.status(500).json({
      success: false,
      message: 'Cannot Create Section , please try again',
      error: error.message,
    })
  }
}

//updateSection
exports.updateSection = async (req, res) => {
  try {

  } catch (error) {

  }
}



//deleteSection
exports.deleteSection = async (req, res) => {
  try {

  } catch (error) {

  }
}