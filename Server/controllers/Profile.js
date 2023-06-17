const Profile = require('../models/Profile');
const User = require('../models/User');
//TODO -> how can we schedule or request -> is there any method to schedule it 

// req.user = decode; this was inserted in auth.js middleware
exports.updateProfile = async (req, res) => {

  try {
    //getRequired Data
    //get userId
    //validation
    //find profile
    //update profile
    //return response

    //getRequired Data

    const { gender, dateOfBirth = "", about = "", contactNumber } = req.body;
    //get userId
    const id = req.user.id;
    //validation
    if (!contactNumber || !gender || !id) {
      return res.status(400).json({
        success: false,
        message: 'All Fields are mandatory.',
      });
    }
    //find profile
    const userDetails = await User.findById(id);
    const profileId = userDetails.additonalDetails;
    const profileDetails = await Profile.findById(profileId);
    //NOTE: you can use findByIdAndUpdate but we have two method to create a entry in databae
    //first one is by create method another one is by save method

    //update profile
    profileDetails.gender = gender;
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.contactNumber = contactNumber;
    await profileDetails.save();
    //return response
    return res.status(200).json({
      success: true,
      message: 'Profile Details updated Successfully',
      profileDetails,

    });

  } catch (error) {
    return res.status(500).json({
      success: true,
      message: 'Internal Server Error in Updating Profile',
      error: error.message,
    });

  }

}


//deleteAccount
exports.deleteAccount = async (req, res) => {
  try {

    //get id
    const id = req.user.id;
    //check for valid id
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found',
      });
    }
    //scope of Modification -> request a schedulung a task or request
    //crone job
    //delete Profile
    await Profile.findByIdAndDelete({ _id: userDetails.additonalDetails });
    //delete user
    await user.findByIdAndDelete(id);

    //TODO -> unenoroll users from enrolled  courses

    ///return respose
    return res.status(200).json({
      success: true,
      message: 'User deleted Successfully',
    });


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error in Deleting Account',
      error: error.message,
    });
  }
}

exports.getAllUserDetails = async (req, res) => {
  try {
    //get id
    //getuserDetails and validation
    //return res

    //get id
    const id = req.user.id;

    //validation
    const userDetails = await User.findById(id).populate("additionalDetails").exec();
    if (!id) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    //return all details 
    return res.status(200).json({
      success: true,
      message: 'User Data Fetched Successfully',

    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error in Fetching Details ',
      error: error.message,
    });
  }
}
