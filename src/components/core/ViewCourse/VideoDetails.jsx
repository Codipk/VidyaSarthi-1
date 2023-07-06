import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import { AiFillPlayCircle } from "react-icons/ai";
import IconBtn from "../../common/IconBtn";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  console.log("section id", sectionId);
  console.log("course id", courseId);
  console.log("subsection id", subSectionId);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);
  // cosnt subsection=useState((state)=>)
  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData.length) return;
      if (!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        //let's assume k all 3 fields are present

        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        );
        console.log("section id", sectionId);

        console.log("coursesectiondata", courseSectionData);

        const filteredVideoData = filteredData?.[0].subSection?.filter(
          (data) => data._id === subSectionId
        );

        setVideoData(filteredVideoData[0]);
        setVideoEnded(false);
      }
    };
    setVideoSpecificDetails();
  }, [courseSectionData, courseEntireData, location.pathname]);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection?.findIndex((data) => data._id === subSectionId);
    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection?.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection?.findIndex((data) => data._id === subSectionId);

    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection?.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection?.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex !== noOfSubSections - 1) {
      //same section ki next video me jao
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSectionIndex + 1
        ]?._id;
      //next video pr jao
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      //different section ki first video
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]?._id;
      ///iss voide par jao
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection?.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex != 0) {
      //same section , prev video
      const prevSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex - 1
        ];
      //iss video par chalge jao
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      //different section , last video
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength =
        courseSectionData[currentSectionIndex - 1].subSection?.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndex - 1].subSection[
          prevSubSectionLength - 1
        ]?._id;
      //iss video par chalge jao
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    ///dummy code, baad me we will replace it witht the actual call
    setLoading(true);
    //PENDING - > Course Progress PENDING
    const res = await markLectureAsComplete(
      { courseId: courseId, subSectionId: subSectionId },
      token
    );
    //state update
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };
  return (
    <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
      <div className="text-white w-[180vh] h-auto">
        <div className="mx-6">
          <div className="flex flex-col gap-5 text-white">
            {!videoData ? (
              <div>No Data Found</div>
            ) : (
              <Player
                ref={playerRef}
                aspectRatio="16:9"
                playsInline
                onEnded={() => setVideoEnded(true)}
                src={videoData?.videoUrl}
              >
                <AiFillPlayCircle />

                {/* <div className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"> */}
                {videoEnded && (
                  // <div className="flex flex-row gap-4 mb-[120px] p-3 ml-[150px] mt-[80px] text-xl overflow-hidden justify-end">
                  <div className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center flex-row gap-3 cursor-pointer rounded-md py-2 px-2 font-semibold text-richblack-900 text-xl ">
                        {!completedLectures.includes(subSectionId) && (
                          <IconBtn
                            disabled={loading}
                            onclick={() => handleLectureCompletion()}
                            text={!loading ? "Mark As Completed" : "Loading..."}
                          />
                        )}

                        {/* <div className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-4 mx-auto mt-2"> */}
                        <IconBtn
                          disabled={loading}
                          onclick={() => {
                            if (playerRef?.current) {
                              playerRef.current?.seek(0);
                              setVideoEnded(false);
                            }
                          }}
                          text="Rewatch"
                          customClasses="text-xl"
                        />
                        {/* </div> */}
                      </div>
                      <div className="flex flex-col gap-2 ">
                        {!isFirstVideo() && (
                          <button
                            disabled={loading}
                            onClick={goToPrevVideo}
                            className="bg-richblack-300 rounded-md text-white font-semibold text-xl shadow-white px-3 py-3 "
                          >
                            Prev
                          </button>
                        )}
                        {!isLastVideo() && (
                          <button
                            disabled={loading}
                            onClick={goToNextVideo}
                            className="bg-richblack-300 rounded-md text-white font-semibold text-xl shadow-white px-3 py-3 "
                          >
                            Next
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {/* </div> */}
              </Player>
            )}
            <div className="flex flex-col gap-2 mt-2">
              <h1 className="font-semibold">{videoData?.title}</h1>
              <p>{videoData?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
