const express = require('express');
const User = require('./models/User');
const app = express();

const userRoutes = require('./routes/User');
const profileRoutes = require('./routes/Profile');
const paymentRoutes = require('./routes/Payment');
const courseRoutes = require('./routes/Course');

const database = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { cloudinaryConnect } = require('./config/cloudinary');
const fileUplaod = require('express-fileupload');
require('dotenv').config();

const PORT = process.env.PORT || 8000;

//connect with database
database.connect();

//middleware
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
//want to entertain the request from frontend
app.use(
  cors({
    origin: `http://localhost:${process.env.FRONTEND_PORT}`,
    credentials: true,
  })
);
app.use(
  fileUplaod({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//connect to cloudinary
cloudinaryConnect();



//mount the routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);

//adding defaut route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: 'Your server is up and running up',
  });
});

app.listen(PORT, (req, res) => {
  console.log(`Your Server is running on PORT ${PORT}`);
})
