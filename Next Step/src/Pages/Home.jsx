import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import Slider from "../Components/Slider";
import About from "../Components/About";
import { AuthContext } from "../Context/AuthContextProvider";
import { Link as ScrollLink } from "react-scroll";
import Stats from "../Components/Stats";



const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | NextStep</title>
      </Helmet>

      <div>
        <img
          src="https://i.ibb.co.com/YhQmWCP/rec.png"
          alt=""
          className="absolute w-[18%] scale-150 -top-10 lg:-left-20 -left-7 z-0"
        />
      </div>
      <div>
        <img
          src="https://i.ibb.co.com/nmF9xpL/rec2.png"
          alt=""
          className="absolute w-[10%] opacity-70 scale-150 top-20 lg:right-20 right-16 blur-sm"
        />
      </div>

      <div className="lg:w-[80%] w-[90%] mx-auto lg:py-20 pt-10 pb-20 lg:pb-0 relative items-center justify-center">
        <div className="flex items-center justify-center z-20 lg:mt-3 absolute md:right-7 lg:right-[2rem] xl:right-[9.6rem] text-center flex-col">
          <h1 className="lg:text-6xl text-5xl leading-[1.05] font-bold">
            <span className="lg:text-5xl text-3xl">Shape Your Future with</span> <br />{" "}
            Expert Career Guidance
          </h1>
          <p className="mt-3 lg:text-normal text-md">
            Discover your strengths, explore opportunities, and build a roadmap
            to success with <br /> personalized counseling and resources.
          </p>
          <ScrollLink to="journey" smooth={true} duration={500}>
            <button className="text-white bg-black/80 px-4 py-1.5 rounded-full text-sm text-white/90 my-3">
              Start your journey
            </button>
          </ScrollLink>
        </div>
        <div>
          <img
            className="absolute z-10 -top-[1rem] lg:left-[2rem] left-[-0.5rem] opacity-90 lg:w-[90%]"
            src="https://i.ibb.co.com/542LBTH/bg.png"
            alt=""
          />
        </div>
        <div className="pb-32 flex lg:flex-row flex-col items-center gap-10 mt-[24rem]">
          <div className="lg:w-[40%] w-[90%] text-center lg:text-left">
            <h1 className="text-5xl font-bold">
              Your Future, <br /> Our Focus
            </h1>
            <p className="text-sm mt-3">
              Explore your options and achieve your goals with our personalized
              career counseling
            </p>
          </div>

          <div className="lg:w-[60%] w-[100%] z-40">
            <Slider></Slider>
          </div>
        </div>

        <div className="mt-16 lg:w-[70%] w-[90%] mx-auto flex items-center justify-center flex-col">
          <h1 className="text-4xl font-bold text-center">
            <span id="about" className="text-[#F83179]">What's so Special</span> About
            NextStep?
          </h1>
          <p className="text-sm mt-2 mb-10">
            Our career counseling stands out because -
          </p>

          <div>
            <About></About>
          </div>
        </div>

        <div className="mt-32">
          <Outlet></Outlet>
        </div>


        <div className="md:mt-16 lg:mt-0 mt-20">
          <Stats></Stats>
        </div>
      </div>
    </>
  );
};

export default Home;
