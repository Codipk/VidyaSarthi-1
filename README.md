# VidyaSarthi 📚

VidyaSarthi is a fully functional ed-tech platform built using the MERN stack, aimed at providing a seamless learning experience for students and a platform for instructors to share their expertise.

## Features ✨

### User Authentication 🔐

- **Signup**: Users can create an account on VidyaSarthi by providing their email and password.
- **Login**: Registered users can log in to their accounts using their credentials.
- **OTP Authentication**: VidyaSarthi supports OTP (One-Time Password) verification for secure user authentication.
- **Forgot Password**: Users can reset their password by requesting a password reset link via email.

### Course Management 📝

- **Create Courses**: Instructors can create new courses by providing course details such as title, description, and content.
- **Edit Courses**: Instructors have the ability to edit existing courses, including updating course information and adding new content.
- **Delete Courses**: Instructors can delete courses that are no longer relevant or needed in 'Draft' status.
- **Course Ratings**: Users can rate courses based on their experience, providing valuable feedback for both instructors and students.
- **Course Wishlist**: Users can add courses to their wishlist for easy access and future enrollment.


### Other Features 🌟

- **Dashboard**: Users have access to a personalized dashboard where they can view their enrolled courses, wishlist, and other relevant information.
- **Payment Integration**: VidyaSarthi integrates with payment gateways to facilitate course purchases securely.
- **Cloud-based Media Management**: The platform uses Cloudinary for storing and managing media content, such as images and videos, related to courses.
- **Markdown Formatting**: Course content is stored in Markdown format, allowing for easy formatting and rendering on the frontend.

## Usage 🚀

### Prerequisites

- Node.js and npm installed on your system
- MongoDB database set up
- Cloudinary account for media management

## Join VidySarthi

Join us at VidyaSarthi and embark on a shared adventure of knowledge, connection, and growth. Together, let's make learning a collaborative and enriching experience.

## Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- Create a Cloudinary account and obtain your `API_KEY API_SECRET` and Create FOLDER_NAME by you won - [Cloudinary](https://cloudinary.com/)

- Get `CLIENT_ID CLIENT_SECRET REFRESH_TOKEN`
  from [Google Developer Console](https://console.cloud.google.com/welcome?project=eateasy-405214)

### Env Variables

create the `.env` file and add the following

```
#cloudinary details
CLOUD_NAME =
API_KEY =
API_SECRET =
FOLDER_NAME =

PORT =
MONGODB_URL =
JWT_SECRET =

FRONTEND_LINK =

#google.gmail.com
CLIENT_ID =
CLIENT_SECRET =
REFRESH_TOKEN =
USER_EMAIL =

Change the JWT_SECRET to whatever you want.

```
### Install Dependencies (frontend & backend)
```
npm install
cd server
npm install
```

### Run

```
# Run backend (:4000) & frontend (:3000)
cd server
npm run server

# Run frontend
npm run start
```

## Build & Deploy

```
# Create frontend prod build
npm run build
```
