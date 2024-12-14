import React, { useContext, useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FiChevronRight } from "react-icons/fi";
import { DarkModeContext } from "../DarkModeProvider/DarkModeProvider";
import { MdOutlineStarPurple500 } from "react-icons/md";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Import required Swiper modules
import { Navigation } from "swiper/modules";

const Customer = () => {
  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);
  return (
    <div>
      <div className="slider-container  ">
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
            <div
              className={`shadow-xl ml-5 p-6 lg:h-[14.5rem] h-[13rem] xl:h-[13rem] ${
                isDarkMode ? "bg-[#282938]" : "bg-white"
              } border border-black/10 rounded-xl`}
            >
              <div className="flex items-center gap-3">
                <img
                  src="https://i.ibb.co.com/YX2gjf9/smiling-young-man-with-crossed-arms-outdoors-1140-255.jpg"
                  className="lg:w-12 w-8 h-8 lg:h-12 rounded-full"
                  alt=""
                />

                <div className="lg:-translate-y-2 -translate-y-1">
                  <h1
                    className={`font-semibold lg:text-lg text-md mt-2 ${
                      isDarkMode ? "text-[#FFCA80]" : "text-[black]"
                    }`}
                  >
                    Niloy
                  </h1>
                  <h1 className="flex lg:text-xl text-xs">
                    <MdOutlineStarPurple500 className="text-[#fad449]"></MdOutlineStarPurple500>
                    <MdOutlineStarPurple500 className="text-[#fad449]"></MdOutlineStarPurple500>
                    <MdOutlineStarPurple500 className="text-[#fad449]"></MdOutlineStarPurple500>
                    <MdOutlineStarPurple500 className="text-[#fad449]"></MdOutlineStarPurple500>
                    <MdOutlineStarPurple500 className="text-[#fad449]"></MdOutlineStarPurple500>
                  </h1>
                </div>
              </div>
              <hr className="my-2" />
              <p
                className={`text-sm font-light ${
                  isDarkMode ? "text-[white]" : "text-black/80"
                }`}
              >
                Amazing quality and fast delivery!{" "}
                <span className="lg:inline hidden">
                  I purchased a set of badminton rackets, and they exceeded my
                  expectations. Will definitely shop here again! The pricing was
                  also very reasonable for such high-quality gear. Amazing
                  quality and fast delivery!{" "}
                </span>
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className={`shadow-xl ml-5 p-6 lg:h-[14.5rem] h-[13rem] xl:h-[13rem] ${
                isDarkMode ? "bg-[#282938]" : "bg-white"
              } border border-black/10 rounded-xl`}
            >
              <div className="flex items-center gap-3">
                <img
                  src="https://i.ibb.co.com/VSqyfqt/guy-plaid-shirt-158595-126.jpg"
                  className="lg:w-12 w-8 h-8 lg:h-12 rounded-full"
                  alt=""
                />

                <div className="lg:-translate-y-2 -translate-y-1">
                  <h1
                    className={`font-semibold text-lg mt-2 ${
                      isDarkMode ? "text-[#FFCA80]" : "text-[black]"
                    }`}
                  >
                    Hasib
                  </h1>
                  <h1 className="flex lg:text-xl text-xs">
                    <MdOutlineStarPurple500 className="text-[#fad449]"></MdOutlineStarPurple500>
                    <MdOutlineStarPurple500 className="text-[#fad449]"></MdOutlineStarPurple500>
                    <MdOutlineStarPurple500 className="text-[#fad449]"></MdOutlineStarPurple500>
                    <MdOutlineStarPurple500 className="text-[#fad449]"></MdOutlineStarPurple500>
                  </h1>
                </div>
              </div>
              <hr className="my-2" />
              <p
                className={`text-sm font-light ${
                  isDarkMode ? "text-[white]" : "text-black/80"
                }`}
              >
                The running shoes I bought are incredibly comfortable{" "}
                <span className="lg:inline hidden">
                  The running shoes I bought are incredibly comfortable and
                  lightweight. Perfect for my daily jogs. Great service too!
                  They even came with a handy guide on how to care for them The
                  running shoes I bought are incredibly comfortable{" "}
                </span>
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className={`shadow-xl ml-5 p-6 lg:h-[14.5rem] h-[13rem] xl:h-[13rem] ${
                isDarkMode ? "bg-[#282938]" : "bg-white"
              } border border-black/10 rounded-xl`}
            >
              <div className="flex items-center gap-3">
                <img
                  src="https://i.ibb.co.com/V2Htfnc/close-up-young-businessman-holding-disposable-coffee-cup-hand-looking-camera-23-2148176166.jpg"
                  className="lg:w-12 w-8 h-8 lg:h-12 rounded-full"
                  alt=""
                />

                <div className="lg:-translate-y-2 -translate-y-1">
                  <h1
                    className={`font-semibold lg:text-lg text-md mt-2 ${
                      isDarkMode ? "text-[#FFCA80]" : "text-[black]"
                    }`}
                  >
                    Hasan
                  </h1>
                  <h1 className="flex lg:text-xl text-xs">
                    <MdOutlineStarPurple500 className="text-[#fad449]"></MdOutlineStarPurple500>
                    <MdOutlineStarPurple500 className="text-[#fad449]"></MdOutlineStarPurple500>
                    <MdOutlineStarPurple500 className="text-[#fad449]"></MdOutlineStarPurple500>
                    <MdOutlineStarPurple500 className="text-[#fad449]"></MdOutlineStarPurple500>
                  </h1>
                </div>
              </div>
              <hr className="my-2" />
              <p
                className={`text-sm font-light ${
                  isDarkMode ? "text-[white]" : "text-black/80"
                }`}
              >
                <span className="lg:inline hidden">
                  As a professional athlete, I’m impressed with the range of
                  products available.
                </span>{" "}
                Found everything I needed for{" "}
                <span className="lg:inline hidden">my training</span>
                sessions at great prices.{" "}
                <span className="lg:inline hidden">
                  sessions at great prices. The website's user-friendly design
                  made shopping a breeze. sessions at great prices.{" "}
                </span>
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className={`shadow-xl ml-5 lg:mr-5 mb-10 p-6 lg:h-[14.5rem] h-[13rem] xl:h-[13rem] ${
                isDarkMode ? "bg-[#282938]" : "bg-white"
              } border border-black/10 rounded-xl`}
            >
              <div className="flex items-center gap-3">
                <img
                  src="https://i.ibb.co.com/ZX4fcRx/portrait-adult-man-smiling-23-2148531014.jpg"
                  className="lg:w-12 w-8 h-8 lg:h-12 rounded-full"
                  alt=""
                />

                <div className="lg:-translate-y-2 -translate-y-1">
                  <h1
                    className={`font-semibold lg:text-lg text-md mt-2 ${
                      isDarkMode ? "text-[#FFCA80]" : "text-[black]"
                    }`}
                  >
                    Abdullah
                  </h1>
                  <h1 className="flex lg:text-xl text-xs">
                    <MdOutlineStarPurple500 className="text-[#fad449]"></MdOutlineStarPurple500>
                    <MdOutlineStarPurple500 className="text-[#fad449]"></MdOutlineStarPurple500>
                    <MdOutlineStarPurple500 className="text-[#fad449]"></MdOutlineStarPurple500>
                  </h1>
                </div>
              </div>
              <hr className="my-2" />
              <p
                className={`text-sm font-light ${
                  isDarkMode ? "text-[white]" : "text-black/80"
                }`}
              >
                Bought a yoga mat{" "}
                <span className="lg:inline hidden">
                  and some fitness gear –
                </span>{" "}
                the quality is top-notch.{" "}
                <span className="lg:inline hidden">
                  top-notch. Plus, the customer support team was super helpful.
                  Highly recommend! I’ve already recommended this site to all my
                  friends at the gym. top-notch.{" "}
                </span>
              </p>
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="flex items-center justify-center mt-[3rem]">
          <div className="custom-navigation absolute gap-2 flex z-50 -translate-y-10">
            <FiChevronRight
              onClick={handlePrev}
              className={`cursor-pointer ${
                isDarkMode
                  ? "bg-[#FFC383] text-black"
                  : "bg-black/80 text-white"
              } p-2 text-4xl rounded-xl rotate-180 custom-prev`}
            >
              <button className="custom-prev">&lt;</button>
            </FiChevronRight>
            <FiChevronRight
              onClick={handleNext}
              className={`cursor-pointer ${
                isDarkMode
                  ? "bg-[#FFC383] text-black"
                  : "bg-black/80 text-white"
              } p-2 text-4xl rounded-xl custom-next`}
            >
              <button className="custom-next">&gt;</button>
            </FiChevronRight>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
