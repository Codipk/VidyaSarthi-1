const User = require('../models/User');
const Course = require('../models/Course');
const { instance } = require('../config/razorpay');
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail');
const mailSender = require('../utils/mailSender');
const { default: mongoose } = require('mongoose');


//capature the payment and initiate the Razorpay order

exports.capturePayment = async (req, res) => {
    //get courseId and userId
    //validation
    //valid courseId
    //valid courseDetails
    //user already paid for same course ?
    //create order
    //return response

    //get courseId and userId
    const { course_id } = req.body;
    const userId = req.user.id;
    //validation
    //valid courseId
    if (!course_id) {
        return res.json({
            success: false,
            message: "Please provide Valid Course id",
        });
    }
    //valid courseDetails
    let course;
    try {
        course = await Course.findById(course_id);
        if (!course) {
            return res.json({
                success: false,
                message: "Couldn't Find the Course",
            });
        }
        //user already paid for same course ?
        const uid = mongoose.Types.ObjectId(userId);//userId was string and this is converted now into OBJECTID
        if (course.studentEnrolled.includes(uid)) {
            return res.status(200).json({
                success: true,
                message: 'User Already Enrolled to This Course',
            });
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }

    //create order
    const amount = course.price;
    const currency = "INR";
    const options = {
        amount: amount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes: {
            courseId: course_id,
            userId,
        },
    }
    try {
        const paymentResponse = await instance.orders.create(options);
        console.log("Payment Response : ", paymentResponse);
        //return response
        return res.status(200).json({
            success: true,
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: 'Could not initiate the order'
        })
    }
}

//verfiy signature from razorpay and server

exports.verifySignature = async (req, res) => { // this request is not from frontend it is from razor pay
    //we have added that in notes
    const webhookSecret = "12345678";
    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (signature === digest) {
        console.log("Payment is Authorised");
        //courseID, UserId
        const { courseId, userId } = req.body.payload.payment.entity.notes;
        //no needof validation

        //fullfill the action

        //find the coruse and enroll the student
        try {
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentEnrolled: userId } },
                { new: true },
            );
            //verifly the resposne
            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: 'Course Not Found',
                });
            }
            console.log("Enrolled Course: ", enrolledCourse);
            //find the student and add the course to their enrolled course list
            const enrolledStudent = await User.findOneAndUpdate(
                { _id: userId },
                { $push: { courses: courseId } },
                { new: true },
            );
            console.log("Enrolled Student : ", enrolledStudent);
            //send confirmation email
            const emialResponse = await mailSender(
                enrolledStudent.email,
                "Congratulation from VidyaSarthi",
                "Congratulation for geting enrolled in new Courses"///update later
            );
            console.log("Email Response: ", emialResponse);

            return res.status(200).json({
                success: true,
                message: 'Signature Verified and Course Enrolled',
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
    else {
        return res.status(400).json({
            success: false,
            message: 'Invalid request',
        });
    }


};