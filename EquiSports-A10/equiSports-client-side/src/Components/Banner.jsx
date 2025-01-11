import React, { useContext } from "react";
import lightbg from "../assets/backbg.svg";
import darkbg from "../assets/darkbg.svg";
import Lottie from "lottie-react";
import bat from "../assets/bat.json";
import ball from "../assets/ball.json";
import { DarkModeContext } from "../DarkModeProvider/DarkModeProvider";
import { RiTextBlock } from "react-icons/ri";
import Slider from "./Slider";

const Banner = () => {
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);

  return (
    <div className="flex w-[85%] mx-auto z-10 relative">
      <div className="flex w-full flex-col items-center justify-center mx-auto">
        <div className="text-center mt-10">
          <h1 className="lg:text-3xl text-2xl font-medium">
            Elevate Your Game with <br />{" "}
            <span
              className={`lg:text-4xl text-4xl font-bold ${
                isDarkMode
                  ? "bg-gradient-to-r from-[#ff8499] to-[#ffd07e] text-transparent bg-clip-text"
                  : "bg-gradient-to-b from-[#5ea8f7] to-[#025fff] text-transparent bg-clip-text"
              }`}
            >
              World-Class Sports Equipment!
            </span>
          </h1>
          <p
            className={`mt-2 lg:text-sm text-xs ${
              isDarkMode ? "text-white/85" : "text-black"
            }`}
          >
            Browse our extensive collection of high-performance gear designed to
            meet the needs of athletes, <br /> ensuring you have the right tools
            to succeed in any sport.
          </p>
        </div>

        <div className="lg:w-[75%] mx-auto mt-7 w-full">
          <Slider></Slider>
        </div>
      </div>
    </div>
  );
};

export default Banner;
