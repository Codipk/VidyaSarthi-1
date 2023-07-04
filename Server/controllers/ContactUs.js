const mailSender = require("../utils/mailSender");
const sendEmailToUser = require("../mail/templates/emailToUser");
const sendEmailToAdmin = require("../mail/templates/emailToAdmin");

exports.contactUs = async (req, res) => {
  const { firstname, lastname, email, countrycode, phoneNo, message } =
    req.body;
  console.log("First name: ", firstname);
  console.log("lastname: ", lastname);
  try {
    const name = firstname + " " + lastname;
    console.log("name: ", name);

    await mailSender(
      email,
      "Thank You For Contacting VidyaSarthi",
      sendEmailToUser(name)
    );
    const userDetails = {
      name: firstname + " " + lastname,
      email: email,
      phoneNumber: countrycode + phoneNo,
      message: message,
    };
    const adminEmail = "sundram.smn@gmail.com";

    await mailSender(
      adminEmail,
      "A User Wants To Contact You ",
      sendEmailToAdmin(userDetails)
    );
    //console.log(userDetails);
    return res.status(200).json({
      success: true,
      message: "Thanks For Contacting Us",
      userDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Please Try Again.",
      error,
    });
  }
};
