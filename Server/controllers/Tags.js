const Tag = require('../models/Tag');

//handler of createTag API

exports.createTag = async (req, res) => {
  try {
    //fetch data
    const { name, description } = req.body;
    //validation
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: 'All fields are Reuired',
      });
    }
    //create entry in DB
    const tagDetails = await Tag.create({
      name: name,
      description: description,
    });
    console.log("TagDetails : ", tagDetails);
    //return response
    return res.status(200).json({
      success: true,
      message: 'Tag created Successfully',
    });

  } catch (error) {
    console.log("Error in Creating Tags : ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllTags = async (req, res) => {
  try {
    const allTag = await Tag.find({}, { name: true, description: true });
    return res.status(200).json({
      success: true,
      message: 'All tags are created successfully',
      allTag,
    })


  } catch (error) {
    console.log("Error in Creating Tags : ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}