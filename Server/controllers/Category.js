const Category = require('../models/Category');

//handler of createCategory API

exports.createCategory = async (req, res) => {
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
    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log("CategoryDetails : ", categoryDetails);
    //return response
    return res.status(200).json({
      success: true,
      message: 'Category created Successfully',
    });

  } catch (error) {
    console.log("Error in Creating Category : ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const allCategoory = await Category.find({}, { name: true, description: true });
    return res.status(200).json({
      success: true,
      message: 'All Category are created successfully',
      allCategoory,
    })


  } catch (error) {
    console.log("Error in Creating Category : ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}