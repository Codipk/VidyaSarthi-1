import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { AiOutlineDown } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    const setActiveFlags = () => {
      if (!courseSectionData.length) return;
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );
      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSection.findIndex((data) => data._id === subSectionId);
      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ]?._id;
      //set current section here
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      //set current sub-section here
      setVideoBarActive(activeSubSectionId);
    };
    setActiveFlags();
  }, [courseSectionData, courseEntireData, location.pathname]);

  const handleAddReview = () => {
    console.log("I am inside Add handleAddReview");
    setReviewModal(true);
  };

  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
        {/* for buttons and headings */}
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          {/* for buttons */}
          <div className="flex w-full items-center justify-between ">
            <div
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
              title="back"
              onClick={() => {
                navigate("/dashboard/enrolled-courses");
              }}
            >
              <BiArrowBack />
            </div>

            <div className="px-5 py-2 ml-auto gap-x-2 flex items-center rounded-md">
              <IconBtn text="Add Review" onclick={() => handleAddReview()} />
            </div>
            <div className="bg-richblack-700 h-[1px] mt-1 font-semibold"></div>
          </div>
          {/* for heading or title */}
          <div className="flex flex-row items-center gap-3">
            <p className="font-semibold">{courseEntireData?.courseName}</p>
            <p>
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        {/* for sections and subSections */}
        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData.map((course, index) => (
            <div
              onClick={() => setActiveStatus(course?._id)}
              key={index}
              className="mt-2 cursor-pointer text-sm text-richblack-5"
            >
              {/* section */}

              <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                <div className="w-[70%] font-semibold">
                  {course?.sectionName}
                </div>
                {/* HW- add icon here and handle rotate 180 logic */}
                <div className="flex items-center gap-3">
                  <span className="rotate-180 transition-all duration-500">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 16 16"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>

              {/* subSections */}
              <div className="transition-[height] duration-500 ease-in-out">
                {activeStatus === course?._id && (
                  <div className="transition-[height] duration-500 ease-in-out ">
                    {course.subSection.map((topic, index) => (
                      <div
                        className={`flex gap-3 p-3 mt-2 ${
                          videoBarActive === topic._id
                            ? "bg-richblue-50 rounded-sm text-richblack-900"
                            : "bg-richblack-900 text-white"
                        }`}
                        key={index}
                        onClick={() => {
                          navigate(
                            `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                          );
                          setVideoBarActive(topic?._id);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={completedLectures.includes(topic?._id)}
                          onChange={() => {}}
                        />
                        <span>{topic.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoDetailsSidebar;
