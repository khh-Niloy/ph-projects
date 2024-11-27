import React, { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FiChevronRight } from "react-icons/fi";

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

  return (
    <div className="slider-container">
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
          <div className="w-full rounded-xl xl:h-[11.5rem] lg:h-[9.5rem] h-[6.6rem] sm:h-[8rem] md:h-[10rem] overflow-hidden">
            <img
              src="https://i.ibb.co.com/c6jSncb/close-up-people-meeting-23-2148686500.jpg"
              alt=""
              className="w-full object-cover rounded-xl"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full rounded-xl xl:h-[11.5rem] lg:h-[9.5rem] h-[6.6rem] sm:h-[8rem] md:h-[10rem] overflow-hidden">
            <img
              src="https://img.freepik.com/free-photo/businessman-sitting-with-laptop-talking-other-colleagues_1262-809.jpg?t=st=1731855528~exp=1731859128~hmac=6c9a3b67efde15f79ea1e284fbdc24376ed04601ea703cfd3c00bf3c8fe87ed3&w=900"
              alt=""
              className="w-full rounded-xl"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full rounded-xl xl:h-[11.5rem] lg:h-[9.5rem] h-[6.6rem] sm:h-[8rem] md:h-[10rem] overflow-hidden">
            <img
              src="https://img.freepik.com/free-photo/resume-apply-work-form-concept_53876-132737.jpg?t=st=1731857171~exp=1731860771~hmac=efb1d54b114a36dec7efd8880ea8c3ce75e227a158d7bb446ca5644513e3f14c&w=740"
              alt=""
              className="w-full rounded-xl"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full rounded-xl  xl:h-[11.5rem] lg:h-[9.5rem] h-[6.6rem] sm:h-[8rem] md:h-[10rem] overflow-hidden">
            <img
              src="https://img.freepik.com/free-photo/production-manufacture-process-chart-diagram_53876-120646.jpg?t=st=1731855645~exp=1731859245~hmac=0a9a6a04f510ef757adf4c33bc563ece41393f6d495ea74adeee353129807a27&w=900"
              alt=""
              className="w-full rounded-xl"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full rounded-xl  xl:h-[11.5rem] lg:h-[9.5rem] h-[6.6rem] sm:h-[8rem] md:h-[10rem] overflow-hidden">
            <img
              src="https://img.freepik.com/free-photo/front-view-smiley-man-holding-paper_23-2150171318.jpg?t=st=1731856450~exp=1731860050~hmac=d685ff0a0faf5be430415bb6b869a136be3d2354c0579d266885c7120f531681&w=900"
              alt=""
              className="w-full rounded-xl"
            />
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="custom-navigation absolute mt-7 gap-2 flex left-[9.5rem] 
      lg:left-[20.3rem] xl:left-[25.1rem] sm:left-[15.5rem]
      md:left-[19rem]">
        <FiChevronRight
          onClick={handlePrev}
          className="cursor-pointer bg-black/80 text-white p-2 text-4xl rounded-full rotate-180 custom-prev"
        >
          <button className="custom-prev">&lt;</button>
        </FiChevronRight>
        <FiChevronRight
          onClick={handleNext}
          className="cursor-pointer bg-black/80 text-white p-2 text-4xl rounded-full custom-next"
        >
          <button className="custom-next">&gt;</button>
        </FiChevronRight>
      </div>
    </div>
  );
};

export default Slider;
