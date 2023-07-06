import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper";
import ReactStars from "react-rating-stars-component";
import { apiConnector } from "../../services/apiconnector";
import { ratingsEndpoints } from "../../services/apis";
import { FaStar } from "react-icons/fa";

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    const fetchAllReviews = async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      );
      console.log("LOgging response in rating", data);

      if (data?.success) {
        setReviews(data?.data);
      }

      console.log("Printing Reviews", reviews);
    };
    fetchAllReviews();
  }, []);

  return (
    <div className="text-white  py-3">
      <div className="h-[300px] max-w-maxContent py-[3px]">
        <Swiper
          slidesPerView={4}
          spaceBetween={24}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
          }}
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination, Autoplay]}
          // className="w-full"
        >
          {reviews.map((review, index) => (
            <SwiperSlide
              key={index}
              className="max-w-sm h-[250px] p-2 bg-richblack-800 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-richblack-800 "
            >
              <div className="flex flex-row gap-3 ">
                <img
                  src={
                    review?.user?.image
                      ? review?.user?.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                  }
                  alt="Profile Pic"
                  className="h-9 w-9 object-cover rounded-full"
                />

                <p>
                  {review?.user?.firstName} {review?.user?.lastName}
                </p>
              </div>
              <div className="m-2"></div>
              <p className="  shadow-white text-richblack-50 font-semibold ">
                {review?.course?.courseName}
                <div className="border-dashed  h-[0.5px] bg-richblack-100"></div>
              </p>
              <p className=" overflow-hidden ">{review?.review}</p>
              <div className="flex flex-row gap-2    ">
                <p className="mt-[4px]  items-baseline ">
                  {review?.rating.toFixed(1)}
                </p>
                <ReactStars
                  count={5}
                  value={review.rating}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar />}
                  fullIcon={<FaStar />}
                  required={true}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewSlider;
