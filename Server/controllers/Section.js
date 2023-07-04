const Section = require("../models/Section");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

const SubSection = require("../models/SubSection");
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
        message: "Mising Required Properties",
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
        },
      },
      { new: true } //this will lead to return updated Course
    ) //TODO-> use populate to replace section/sub-section both in updatedcourseDetails
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
      message: "Section Created Successfully",
      updatedCourse,
    });
  } catch (error) {
    console.log("Error in creating section : ", error);
    return res.status(500).json({
      success: false,
      message:
        "Internal Server Error. Cannot Create a Section , please try again",
      error: error.message,
    });
  }
};

//updateSection
// exports.updateSection = async (req, res) => {
//   try {
//     //data input
//     //data validation
//     //update data
//     //return response

//     //data input
//     let { sectionName, sectionId } = req.body;

//     //data validation
//     // if (!sectionName || !sectionId) {
//     //   return res.status(400).json({
//     //     success: true,
//     //     message: 'All fields are required',
//     //   });
//     // }
//     sectionId = new mongoose.Types.ObjectId(sectionId);
//     console.log("SectionID : ", sectionId);
//     console.log("\nType of Section id : ", typeof sectionId);
//     //update data
//     const section = await Section.findByIdAndUpdate(
//       { _id: sectionId },
//       {
//         sectionName,
//       },
//       { new: true }
//     );
//     //return response
//     return res.status(200).json({
//       success: true,
//       message: "Section Updated Successfully",
//       section,
//     });
//   } catch (error) {
//     console.log("Error in updating section : ", error);
//     return res.status(500).json({
//       success: false,
//       message:
//         "Internal Server Error. Cannot Update a Section , please try again",
//       error: error.message,
//     });
//   }
// };

exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId, courseId } = req.body;
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.status(200).json({
      success: true,
      message: section,
      data: course,
    });
  } catch (error) {
    console.error("Error updating section:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//deleteSection
// exports.deleteSection = async (req, res) => {
//   try {
//     //get ID -> assuming we are sending ID in parameteres
//     const { sectionId } = req.body;
//     console.log("\nSection Id : ", sectionId);
//     //use findByIdAndDelete function to delete
//     await Section.findByIdAndDelete({ _id: new mongoose.Types.ObjectId(sectionId) });

//     //TODO->Do we need to delete this entry from course schema??
//     //NO it autodelted but why?
//     //return response
//     console.log("\nSection Id : ", sectionId);
//     return res.status(200).json({
//       success: true,
//       message: 'Section Deleted Successfully',

//     });

//   } catch (error) {
//     console.log("Error in deleting section : ", error);
//     return res.status(500).json({
//       success: false,
//       message: 'Internal Server Error. Cannot Delete a Section , please try again',
//       error: error.message,
//     });
//   }
// };
exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;
    await Course.findByIdAndUpdate(courseId, {
      $pull: {
        courseContent: sectionId,
      },
    });
    const section = await Section.findById(sectionId);
    console.log(sectionId, courseId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not Found",
      });
    }

    //delete sub section
    await SubSection.deleteMany({ _id: { $in: section.subSection } });

    await Section.findByIdAndDelete(sectionId);

    //find the updated course and return
    const course = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.status(200).json({
      success: true,
      message: "Section deleted",
      data: course,
    });
  } catch (error) {
    console.error("Error deleting section:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
