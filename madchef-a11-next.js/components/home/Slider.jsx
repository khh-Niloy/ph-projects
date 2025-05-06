"use client";

import React, { useContext, useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FiChevronRight } from "react-icons/fi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Import required Swiper modules
import { Navigation } from "swiper/modules";

export default function Slider() {
  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };
  const isDarkMode = false;
  return (
    <div className="w-[90%] lg:w-[75%] mx-auto mt-10 sm:mt-20 mb-20">
      <div className="text-center mb-8">
        <h1 className="lg:text-3xl text-2xl font-semibold">
          Tempt Your Taste Buds
        </h1>
        <p className="lg:text-sm text-xs mt-2">
          Explore an irresistible collection of mouthwatering dishes, <br />{" "}
          crafted with passion and bursting with flavors to delight your senses
        </p>
      </div>
      <div className="slider-container relative">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={2}
          spaceBetween={20}
          centeredSlides={false}
          modules={[Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="w-full rounded-xl lg:h-[15rem] border border-black overflow-hidden">
              <img
                src="https://i.ibb.co.com/bmJsvkW/delicious-goulash-ready-dinner-23-2149370898.jpg"
                alt=""
                className="w-full lg:h-[15rem] md:h-[12rem] h-[9rem] object-cover rounded-xl"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full rounded-xl lg:h-[15rem] md:h-[12rem] h-[9rem] overflow-hidden">
              <img
                src="https://i.ibb.co.com/kJf9fzh/close-up-rice-with-carrots-garnished-with-lamb-pieces-served-with-pickles-yogurt-141793-2051.jpg"
                alt=""
                className="w-full rounded-xl  lg:h-[15rem] md:h-[12rem] h-[9rem] object-cover"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full rounded-xl border lg:h-[15rem] border-black/10 md:h-[12rem] overflow-hidden">
              <img
                src="https://i.ibb.co.com/DDwD7Vz/top-view-cheesy-pasta-white-plate-181624-28074.jpg"
                alt=""
                className="w-full rounded-xl lg:h-[15rem] md:h-[12rem] h-[9rem] object-cover"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full rounded-xl overflow-hidden lg:h-[15rem] md:h-[12rem]">
              <img
                src="https://i.ibb.co.com/2ShKxYN/margarita-pizza-with-tomato-olive-basil-top-view-141793-2381.jpg"
                alt=""
                className="w-full rounded-xl lg:h-[15rem] md:h-[12rem] h-[9rem] object-cover"
              />
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="flex items-center justify-center z-40">
          <div className="custom-navigation absolute gap-2 flex z-40">
            <FiChevronRight
              onClick={handlePrev}
              className={`cursor-pointer ${
                isDarkMode
                  ? "bg-[white] hover:bg-[#FFC383] duration-300 text-black"
                  : "bg-black/80 text-white"
              } p-2 text-4xl rounded-full rotate-180 custom-prev absolute lg:-top-[9rem] top-[1.5rem] right-[0.5rem] xl:right-[31rem] lg:right-[25rem]`}
            >
              <button className="custom-prev">&lt;</button>
            </FiChevronRight>

            <FiChevronRight
              onClick={handleNext}
              className={`cursor-pointer ${
                isDarkMode
                  ? "bg-[white] hover:bg-[#FFC383] duration-300 text-black"
                  : "bg-black/80 text-white"
              } p-2 text-4xl rounded-full custom-next absolute lg:-top-[9rem] top-[1.5rem] -right-[2.5rem] xl:left-[31rem] lg:left-[25rem]`}
            >
              <button className="custom-next">&gt;</button>
            </FiChevronRight>
          </div>
        </div>
      </div>
    </div>
  );
}
