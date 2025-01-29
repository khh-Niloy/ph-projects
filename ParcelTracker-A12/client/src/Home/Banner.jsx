import React from "react";
import banner from "/FinalBanner.svg";
import smallbanner from "/smallBanner2.svg";
import man from "/man1.svg";
import man2 from "/maaan2.svg";
import cart from "/cart.svg";
import leaf from "/leaf.svg";
import leaf2 from "/lea2f.svg";
import { Button } from "@/components/ui/button";
import safe from "../assets/safe.json";
import Lottie from "lottie-react";
import { Input } from "@/components/ui/input";
import { Link as ScrollLink } from "react-scroll";

const Banner = () => {
  return (
    <div>
      <div className="absolute z-50 w-full text-center xl:top-28 top-20 lg:top-24 sm:top-32 md:top-20 xl:leading-[1.2]">
        <h1 className="xl:text-[2.5rem] lg:text-[2.4rem] sm:text-[2.3rem] md:text-[2rem] text-3xl text-[#101437] font-semibold">
          Your Parcel, Our Priority
        </h1>
        <h1 className="xl:mt-2 xl:text-[2.5rem] lg:text-[2.4rem] sm:text-[2.3rem] md:text-[2rem] text-3xl text-[#101437] font-semibold">
          FastPathao Delivers!
        </h1>
        <p className="mt-2 leading-[1.3] text-black/70 sm:text-sm text-xs md:text-xs">
          Effortless booking, seamless tracking, and reliable delivery <br />
          experience hassle-free parcel management today!
        </p>
        <Lottie
          animationData={safe}
          loop={false} // Set to false if you don't want it to loop
          className="w-[3%] top-[11rem] left-[24rem] absolute hidden"
        />

        <div className="mt-4">
          <div className="xl:left-[27.5rem] lg:left-[20rem] md:left-[14.2rem] left-16 sm:left-[8.5rem] absolute flex md:w-[40%] w-[70%] xl:w-full max-w-sm items-center space-x-2">
            <Input
              type="email"
              placeholder="Search here"
              className="placeholder:text-[black]/30"
            />
            <Button size="sm" type="submit">
              Search
            </Button>
          </div>

          <ScrollLink to="cards" smooth={true} duration={500}>
            <Button size="sm" className="mt-14 bg-[#e83434] text-xs">
              Know More
            </Button>
          </ScrollLink>
        </div>
      </div>
      <img className="hidden md:flex opacity-85" src={banner} alt="" />
      <img className=" opacity-85 md:hidden" src={smallbanner} alt="" />
      <img
        className="absolute xl:top-[2.5rem] lg:top-[1.3rem] md:top-[2rem] top-[12rem] sm:top-[16.3rem] xl:left-[16rem] sm:left-[5rem] left-[2rem] xl:w-[13.3%] w-[20%] md:w-[14%] z-40"
        src={man}
        alt=""
      />
      <img
        className="absolute xl:top-[4.8rem] lg:top-[5.8rem] md:top-[5rem] top-[14.6rem] xl:right-[15rem] sm:top-[20.5rem] right-[3rem] sm:right-[6rem] xl:w-[15%] w-[20%] md:w-[14%]"
        src={man2}
        alt=""
      />
      <img
        className="hidden lg:flex absolute xl:top-[1.4rem] lg:top-[1.6rem] xl:left-[4rem] xl:w-[16.5%] w-[16.5%] z-30 "
        src={cart}
        alt=""
      />
      <img
        className="hidden xl:flex absolute top-[26.5rem] left-[15rem] w-[16.5%] z-30 "
        src={leaf}
        alt=""
      />
      <img
        className="hidden xl:flex absolute top-[26.5rem] right-[22rem] w-[5%] z-20 "
        src={leaf2}
        alt=""
      />
    </div>
  );
};

export default Banner;
