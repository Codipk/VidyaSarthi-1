import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { getInstructorData } from "../../../../services/operations/profileAPI";
import InstructorChart from "./InstructorChart";
import { Link } from "react-router-dom";

const Instructor = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourseDataWithStats = async () => {
      setLoading(true);
      console.log("Instructor Token : ", token);
      const instructorApiData = await getInstructorData(token);
      const result = await fetchInstructorCourses(token);

      console.log(instructorApiData);

      if (instructorApiData.length) setInstructorData(instructorApiData);

      if (result) {
        setCourses(result);
      }
      setLoading(false);
    };
    getCourseDataWithStats();
  }, []);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );
  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );

  return (
    <div className="text-white ">
      <div>
        <h1 className="font-extrabold text-2xl">Hi {user?.firstName} 👋</h1>

        <p className="text-xl">Let's start something new</p>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : courses.length > 0 ? (
        <div>
          <div className="my-4 flex-[450px] space-x-10 ">
            <div className="flex flex-row p-1">
              {/* checkkkk before rendring this===============>HW */}
              {totalStudents === 0 ? (
                "No students enrollend in the course"
              ) : (
                <div className="flex flex-row py-0 px-6">
                  <InstructorChart courses={instructorData} />
                </div>
              )}

              <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 py-6  px-32">
                <p className="text-2xl font-extrabold ">Statistics</p>
                <div className="flex flex-col py-4 text-xl">
                  <p className="font-extrabold">Total Courses</p>
                  <p className="font-semibold">{courses.length}</p>
                </div>

                <div className="flex flex-col py-4 text-xl">
                  <p className="font-extrabold">Total Students</p>
                  <p className="font-semibold">{totalStudents}</p>
                </div>

                <div className="flex flex-col py-4 text-xl">
                  <p className="font-extrabold">Total Income</p>
                  <p className="font-semibold">Rs.{totalAmount}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            {/* Render 3 courses */}
            <div className="rounded-md bg-richblack-800 p-6">
              <div className="flex flex-row items-center justify-between ">
                <p>Your Courses</p>
                <Link to="/dashboard/my-courses">
                  <p>View all</p>
                </Link>
              </div>
              <div className="my-4 flex items-start space-x-6">
                {courses.slice(0, 3).map((course) => (
                  <div className="w-1/3">
                    <img
                      src={course.thumbnail}
                      className="h-[201px] w-full rounded-md object-cover"
                    />
                    <div className="mt-3 w-full">
                      <p className="text-sm font-medium text-richblack-50">
                        {course.courseName}
                      </p>
                      <div className="mt-1 flex items-center space-x-2">
                        <p>{course.studentsEnrolled.length} students</p>
                        <p> | </p>
                        <p> Rs {course.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>You have not created any courses yet</p>
          <Link to={"/dashboard/add-course"}>Create a Course</Link>
        </div>
      )}
    </div>
  );
};

export default Instructor;
