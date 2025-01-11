import React, { useContext, useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FiChevronRight } from "react-icons/fi";
import { DarkModeContext } from "../DarkModeProvider/DarkModeProvider";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Import required Swiper modules
import { Navigation } from "swiper/modules";

const Slider = () => {
  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);

  return (
    <div className="slider-container relative">
      {/* Swiper */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={2}
        spaceBetween={20}
        centeredSlides={false}
        modules={[Navigation]}
        className="mySwiper"
      >
        {/* Static slides */}
        <SwiperSlide>
          <div className="w-full rounded-xl  overflow-hidden  ">
            <img
              src="https://i.ibb.co.com/rp2k0g0/s1.jpg"
              alt=""
              className="w-full lg:h-[13.8rem] h-[9rem] object-cover rounded-xl"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full rounded-xl overflow-hidden">
            <img
              src="https://i.ibb.co.com/zSNFR14/s3.jpg"
              alt=""
              className="w-full rounded-xl  lg:h-[13.8rem] h-[9rem] object-cover"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full rounded-xl  border border-black/10 overflow-hidden">
            <img
              src="https://i.ibb.co.com/p2Xr6Wz/s2.jpg"
              alt=""
              className="w-full rounded-xl lg:h-[13.8rem] h-[9rem] object-cover"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full rounded-xl overflow-hidden">
            <img
              src="https://i.ibb.co.com/YWrWrLY/s4.jpg"
              alt=""
              className="w-full rounded-xl lg:h-[13.8rem] h-[9rem] object-cover"
            />
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="flex items-center justify-center z-50">
        <div className="custom-navigation absolute gap-2 flex z-50">
          <FiChevronRight
            onClick={handlePrev}
            className={`cursor-pointer ${
              isDarkMode ? "bg-[#FFC383] text-black" : "bg-black/80 text-white"
            } p-2 text-4xl rounded-full rotate-180 custom-prev absolute lg:-top-[8rem] top-[1.5rem] right-[0.5rem] xl:right-[30rem] lg:right-[23rem]`}
          >
            <button className="custom-prev">&lt;</button>
          </FiChevronRight>

          <FiChevronRight
            onClick={handleNext}
            className={`cursor-pointer ${
              isDarkMode ? "bg-[#FFC383] text-black" : "bg-black/80 text-white"
            } p-2 text-4xl rounded-full custom-next absolute lg:-top-[8rem] top-[1.5rem] -right-[2.5rem] xl:left-[30rem] lg:left-[23rem]`}
          >
            <button className="custom-next">&gt;</button>
          </FiChevronRight>
        </div>
      </div>
    </div>
  );
};

export default Slider;
