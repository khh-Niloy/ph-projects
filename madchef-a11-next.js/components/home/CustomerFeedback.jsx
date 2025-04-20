"use client";

import React, { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FiChevronRight } from "react-icons/fi";
import { MdOutlineStarPurple500 } from "react-icons/md";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import required Swiper modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const CustomerFeedback = () => {
  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };
  const isDarkMode = false;
  return (
    <div className="w-[100%] lg:w-[65%] mx-auto">
      <div className="flex items-center justify-center mt-20 mb-10 flex-col">
        <h1 className="lg:text-3xl text-2xl font-semibold text-center">
          What Our Customers Say
        </h1>
        <p className="text-center lg:text-sm text-xs mt-2">
          Read the Experiences of Our Satisfied Customers and Find Out Why They{" "}
          <br /> Trust Us for All Their Sports Equipment Needs
        </p>
      </div>

      <div>
        <div className="slider-container">
          {/* Swiper */}
          <Swiper>
            <SwiperSlide>
              <div className="bg-white rounded-2xl p-5 h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border border-gray-100">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src="https://i.ibb.co/YX2gjf9/smiling-young-man-with-crossed-arms-outdoors-1140-255.jpg"
                      className="w-12 h-12 rounded-full object-cover ring-4 ring-red-50"
                      alt="Customer"
                    />
                    <div>
                      <h3 className="font-semibold text-md text-gray-900">
                        Niloy
                      </h3>
                      <div className="flex text-amber-400 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <MdOutlineStarPurple500 key={i} className="text-lg" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">
                  The food arrived hot and fresh, and it was absolutely
                  delicious! Every bite was full of flavor, and I couldn't be
                  happier with my order. The attention to detail in presentation
                  and taste made the whole experience exceptional. Definitely
                  ordering again!
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="bg-white rounded-2xl  p-5 h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border border-gray-100">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src="https://i.ibb.co/VSqyfqt/guy-plaid-shirt-158595-126.jpg"
                      className="w-12 h-12 rounded-full object-cover ring-4 ring-red-50"
                      alt="Customer"
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        Hasib
                      </h3>
                      <div className="flex text-amber-400 mt-1">
                        {[...Array(4)].map((_, i) => (
                          <MdOutlineStarPurple500 key={i} className="text-xl" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">
                  I'm so impressed! The portion size was generous, and the
                  quality was top-notch. The flavors were perfectly balanced,
                  and the delivery was right on time. Their customer service was
                  also exceptional when I had questions. Highly recommend!
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="bg-white rounded-2xl  p-5 h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border border-gray-100">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src="https://i.ibb.co/V2Htfnc/close-up-young-businessman-holding-disposable-coffee-cup-hand-looking-camera-23-2148176166.jpg"
                      className="w-12 h-12 rounded-full object-cover ring-4 ring-red-50"
                      alt="Customer"
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        Hasan
                      </h3>
                      <div className="flex text-amber-400 mt-1">
                        {[...Array(4)].map((_, i) => (
                          <MdOutlineStarPurple500 key={i} className="text-lg" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">
                  This meal exceeded my expectations! The presentation was
                  beautiful, and the taste was even better. It's clear that
                  great care went into preparing this. The ingredients tasted
                  fresh and the flavors blended perfectly. Will be a repeat
                  customer!
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="bg-white rounded-2xl  p-5 h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border border-gray-100">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src="https://i.ibb.co/ZX4fcRx/portrait-adult-man-smiling-23-2148531014.jpg"
                      className="w-12 h-12 rounded-full object-cover ring-4 ring-red-50"
                      alt="Customer"
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        Abdullah
                      </h3>
                      <div className="flex text-amber-400 mt-1">
                        {[...Array(4)].map((_, i) => (
                          <MdOutlineStarPurple500 key={i} className="text-lg" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Absolutely amazing! The food was packed with flavor, and
                  everything was cooked to perfection. The convenience of
                  delivery made it even better. The packaging was eco-friendly
                  and kept everything at just the right temperature until I was
                  ready to eat.
                </p>
              </div>
            </SwiperSlide>
          </Swiper>

          <div className="flex items-center justify-center mt-[5rem]">
            <div className="custom-navigation absolute gap-2 flex z-40 -translate-y-10">
              <FiChevronRight
                onClick={handlePrev}
                className={`cursor-pointer ${
                  isDarkMode ? "bg-white text-black" : "bg-black/80 text-white"
                } p-2 text-4xl rounded-xl rotate-180 custom-prev`}
              >
                <button className="custom-prev">&lt;</button>
              </FiChevronRight>
              <FiChevronRight
                onClick={handleNext}
                className={`cursor-pointer ${
                  isDarkMode ? "bg-white text-black" : "bg-black/80 text-white"
                } p-2 text-4xl rounded-xl custom-next`}
              >
                <button className="custom-next">&gt;</button>
              </FiChevronRight>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerFeedback;
