// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
} = require('../controllers/Course');

// Categories Controllers Import
const {
  showAllCategory,
  createCategory,
  categoryPageDetails,
} = require('../controllers/Category');

// Sections Controllers Import

const {
  createSection,
  deleteSection,
  updateSection,
} = require('../controllers/Section');

//Sub Section Controller Import
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,

} = require('../controllers/Subsection');


//Import Rating Controller
const {
  createRating,
  getAllRating,
  getAverageRating,
} = require('../controllers/RatingAndReview');

//Importing Middleware

const { auth, isAdmin, isInstructor, isStudent } = require('../middlewares/auth');
const { genSaltSync } = require("bcrypt");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************
// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategory)
router.post("/getCategoryPageDetails", categoryPageDetails)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router
