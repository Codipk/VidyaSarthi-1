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
        success: false,
        message: 'Mising Required Properties',
      });
    }

    //create section
    const newSection = await Section.create({ sectionName });
    //update course with section objectID
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        }
      },
      { new: true }, //this will lead to return updated Course
    )//TODO-> use populate to replace section/sub-section both in updatedcourseDetails
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    //return response
    return res.status(200).json({
      success: true,
      message: 'Section Created Successfully',
      updatedCourse,
    });

  } catch (error) {
    console.log("Error in creating section : ", error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error. Cannot Create a Section , please try again',
      error: error.message,
    });
  }
}

//updateSection
exports.updateSection = async (req, res) => {
  try {

    //data input
    //data validation
    //update data
    //return response

    //data input
    const { sectionName, sectionId } = req.body;

    //data validation
    // if (!sectionName || !sectionId) {
    //   return res.status(400).json({
    //     success: true,
    //     message: 'All fields are required',
    //   });
    // }
    //update data
    const section = await Section.findByIdAndUpdate({ sectionId },
      {
        sectionName,
      },
      { new: true },
    )
    //return response
    return res.status(200).json({
      success: true,
      message: 'Section Updated Successfully',
      section,
    });


  } catch (error) {
    console.log("Error in updating section : ", error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error. Cannot Update a Section , please try again',
      error: error.message,
    });
  }
}



//deleteSection
exports.deleteSection = async (req, res) => {
  try {
    //get ID -> assuming we are sending ID in parameteres
    const { sectionId } = req.params;
    //use findByIdAndDelete function to delete
    await Section.findByIdAndDelete(sectionId);
    //TODO->Do we need to delete this entry from course schema??
    //return response
    return res.status(200).json({
      success: true,
      message: 'Section Deleted Successfully',

    });


  } catch (error) {
    console.log("Error in deleting section : ", error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error. Cannot Delete a Section , please try again',
      error: error.message,
    });
  }
};