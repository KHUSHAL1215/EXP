import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../../App.css";
import { FaStar } from "react-icons/fa";
import { Autoplay, FreeMode, Pagination } from "swiper";
import { apiConnector } from "../../services/apiConnector";
import { ratingsEndpoints } from "../../services/apis";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        );
        if (data?.success) {
          setReviews(data?.data);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    })();
  }, []);

  // For testing - uncomment this to simulate single review
  // useEffect(() => {
  //   setReviews([{
  //     user: {
  //       firstName: "Harshit",
  //       lastName: "Gahlawat",
  //       image: ""
  //     },
  //     course: {
  //       courseName: "Full Stack Web Development Bootcamp"
  //     },
  //     review: "Great course",
  //     rating: 5
  //   }]);
  // }, []);

  return (
    <div className="text-white w-full px-4">
      <div className={`my-12 max-w-[1200px] mx-auto ${reviews.length <= 1 ? 'flex justify-center' : ''}`}>
        <Swiper
          slidesPerView={reviews.length >= 1 ? Math.min(reviews.length, 4) : 1}
          spaceBetween={25}
          loop={reviews.length > 1}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full"
          centeredSlides={reviews.length <= 1}
        >
          {reviews.map((review, i) => (
            <SwiperSlide key={i} className={reviews.length <= 1 ? "flex justify-center" : ""}>
              <div className="flex flex-col gap-3 bg-richblack-800 p-4 text-[14px] text-richblack-25 rounded-md min-h-[220px] shadow-md w-[300px]">
                <div className="flex items-center gap-4">
                  <img
                    src={
                      review?.user?.image
                        ? review?.user?.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                    }
                    alt=""
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <h1 className="font-semibold text-richblack-5">
                      {review?.user?.firstName} {review?.user?.lastName}
                    </h1>
                    <h2 className="text-[12px] font-medium text-richblack-500">
                      {review?.course?.courseName}
                    </h2>
                  </div>
                </div>
                <p className="font-medium text-richblack-25">
                  {review?.review.split(" ").length > truncateWords
                    ? review?.review.split(" ").slice(0, truncateWords).join(" ") + "..."
                    : review?.review}
                </p>
                <div className="flex items-center gap-2 mt-auto">
                  <h3 className="font-semibold text-yellow-100">
                    {review.rating.toFixed(1)}
                  </h3>
                  <ReactStars
                    count={5}
                    value={review.rating}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;
