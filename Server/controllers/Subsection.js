const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const { uploadImageToCloudinary } = require('../utils/imageUploader');
require('dotenv').config();

//create subSection
exports.createSubSection = async (req, res) => {
  try {

    //fetch Data from req.body
    //extract file/Video
    //validation
    //upload video to cluodinary -> get secureUrl
    //create subsection
    //update section with this subsection objectId
    //return resposne

    //fetch Data from req.body
    const { sectionId, title, timeDuration, description } = req.body;
    //extract file/Video
    const video = req.files.videoFile;
    //validation
    if (!sectionId || !title || !timeDuration || !description) {
      return res.status(400).json({
        success: false,
        message: 'All Fields are required',
      })
    }
    //upload video to cluodinary -> get secureUrl
    const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME)
    //create subsection
    const subSectionDetails = await SubSection.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });
    //update section with this subsection objectId
    const updatedSection = await Section.findByIdAndUpdate({ _id: sectionId },
      {
        $push: {
          subSection: subSectionDetails._id,
        }
      },
      //TODO -> log Updated Section here, after adding populate query
      { new: true },
    );
    //return resposne
    return res.status(200).json({
      success: true,
      message: 'Subsection Created Successfully',
      updatedSection,
    });

  } catch (error) {
    console.log("Error in creating Section : ", error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Errror',
      error: error.message,
    });
  }
}

//TODO ->
//updateSubSection



//deleteSubSection
