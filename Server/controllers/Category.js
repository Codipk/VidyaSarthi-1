const { Mongoose } = require("mongoose");
const Category = require("../models/Category");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
//handler of createCategory API

exports.createCategory = async (req, res) => {
  try {
    //fetch data
    const { name, description } = req.body;
    //validation
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are Reuired",
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
      message: "Category created Successfully",
    });
  } catch (error) {
    console.log("Error in Creating Category : ", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.showAllCategories = async (req, res) => {
  try {
    // console.log("INSIDE SHOW ALL CATEGORIES");
    const allCategorys = await Category.find({});
    res.status(200).json({
      success: true,
      data: allCategorys,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//TODO-> categoryPageDetails
exports.categoryPageDetails = async (req, res) => {
  try {
    //get categoryId
    //get course for specified categoryId
    //Validation
    //get courses for different category
    //get top selling courses
    //return response

    const { categoryId } = req.body;
    console.log("PRINTING CATEGORY ID: ", categoryId);
    // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: "ratingAndReviews",
      })
      .exec();
    console.log("Selcategory", selectedCategory);
    // Handle the case when the category is not found
    if (!selectedCategory) {
      console.log("Category not found.");
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    // Handle the case when there are no courses
    //console.log("length : ", selectedCategory.course.length);
    if (selectedCategory.courses.length === 0) {
      console.log("No courses found for the selected category.");
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      });
    }

    // const selectedCourses = selectedCategory.course;

    // Get courses for other categories
    // const categoriesExceptSelected = await Category.find({
    //   _id: { $ne: categoryId },
    // }).populate("course");

    // //get coursesfor different categories
    // const differentCategories = await Category.find({
    //   _id: { $ne: categoryId }, //ne -> not equal
    // })

    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });
    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec();

    // Get top-selling courses across all categories
    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: {
          path: "instructor",
        },
      })
      .exec();
    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
