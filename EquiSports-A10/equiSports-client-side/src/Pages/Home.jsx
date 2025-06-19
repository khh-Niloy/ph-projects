import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Slider from "../Components/Slider";
import Banner from "../Components/Banner";
import gradient from "../assets/grad.svg";
import bannerbg from "../assets/bannerBG.svg";
import { DarkModeContext } from "../DarkModeProvider/DarkModeProvider";
import lightbg from "../assets/backbg.svg";
import darkbg from "../assets/darkbg.svg";
import Lottie from "lottie-react";
import bat from "../assets/bat.json";
import ball from "../assets/ball.json";
import Customer from "../Components/Customer";
import About from "../Components/About";
import { Helmet } from "react-helmet";
import TopSelling from "./TopSelling";

const Home = () => {
  const data = useLoaderData();
  const [category, setcategory] = useState([]);
  const [cardData, setcardData] = useState(data);
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);
  const [isCategory, setisCategory] = useState("");

  useEffect(() => {
    let arr = ["All product"];
    data.map((e, index) => {
      if (!arr.includes(e.categoryName)) {
        arr.push(e.categoryName);
      }
    });

    setcategory(arr);
  }, []);

  function handleCategoryButton(name) {
    setisCategory(name);
    if (name === "All product") {
      setcardData(data);
    } else {
      const filteredData = data.filter((e) => e.categoryName === name);
      setcardData(filteredData);
    }
  }

  return (
    <>
      <Helmet>
        <title>Home - EquiSports</title>
      </Helmet>

      <div className="">
        <Banner></Banner>

        <img
          src={bannerbg}
          className={`lg:w-[36%] absolute lg:top-20 lg:-left-52 top-16 -left-52 rotate-45 ${
            isDarkMode ? "hidden" : "flex"
          }`}
          alt=""
        />
        <img
          src={bannerbg}
          className={`lg:w-[36%] absolute lg:-top-[22rem] lg:right-0 z-0 rotate-180 ${
            isDarkMode ? "hidden" : "lg:flex hidden"
          }`}
          alt=""
        />

        <img
          className={`absolute lg:-top-[18rem] -top-24 w-full -left-12 lg:left-[5rem] z-0 lg:w-[60%] ${
            isDarkMode ? "flex" : "hidden"
          }`}
          src={gradient}
          alt=""
        />

        <div className="w-[85%] mx-auto">
          <div className="flex items-center justify-center text-center flex-col lg:mt-[4rem] mt-32 mb-10">
            <h1 className="lg:text-2xl text-2xl font-semibold">
              Discover Premium Sports Gear <br /> for Every Athlete!
            </h1>

            <p className="lg:text-sm text-xs mt-2">
              Explore a wide range of top-tier equipment designed to enhance{" "}
              <br /> your performance and support your athletic journey
            </p>
          </div>
          <div className="flex items-center w-full justify-center mb-10 mt-10 relative">
            <img
              src={isDarkMode ? darkbg : lightbg}
              className="lg:w-[50%] sm:w-[75%] md:w-[65%]"
              alt=""
            />
            <Lottie
              className="absolute lg:w-[20%] sm:w-[39%] md:w-[32%] md:-top-[4rem] md:right-[3.5rem] lg:-top-[3rem] sm:-top-[3.4rem] sm:right-[3rem] lg:right-[13rem] w-[50%] -top-[3.2rem] -right-[1rem]"
              animationData={bat}
              loop={true}
            />
            <Lottie
              className={`absolute lg:w-[20%] sm:w-[40%] md:w-[33%] w-[50%] ${
                isDarkMode
                  ? "lg:top-[6.5rem] top-[3.7rem] -left-[5.5rem] md:top-[4rem] md:-left-[0.1rem] sm:-left-[3rem] lg:left-[10rem]"
                  : "xl:top-[7.5rem] lg:top-[6.5rem] md:top-[5rem] top-[4.5rem] md:-left-[1rem] -left-[5.5rem] sm:-left-[3.5rem] xl:left-[9.3rem] lg:left-[7.5rem]"
              }`}
              animationData={ball}
              loop={true}
            />
          </div>
        </div>

        <div className="w-[85%] mx-auto mt-16">
          <div className="flex flex-col items-center justify-center mb-10">
            <h1 className="lg:text-2xl text-2xl font-semibold">
              Gear Up for Excellence
            </h1>
            <p className="lg:text-sm text-xs text-center mt-2">
              Your ultimate destination for premium sports equipment and
              expertise.
            </p>
          </div>
          <About></About>
        </div>

        <div className="mt-24 mx-auto w-[85%]">
          <div className="flex items-center justify-center flex-col mb-12">
            <h1 className="lg:text-xl text-xl text-center">
              <span className="lg:text-2xl text-2xl font-semibold">
                Explore and Shop
              </span>{" "}
              <br /> the Finest Sports Gear for Your Journey!
            </h1>
            <p className="text-center lg:text-sm text-xs mt-2">
              {" "}
              Explore a wide range of high-quality sports products tailored to
              meet your needs. <br /> Choose your favorites and make your
              purchase with ease!
            </p>
          </div>

          {category.map((e) => (
            <>
              <button
                onClick={() => {
                  handleCategoryButton(e);
                }}
                className={` px-5 py-2 text-sm mt-3 rounded-full duration-300 mr-3 ${
                  isCategory === e
                    ? ` ${
                        isDarkMode
                          ? "bg-[#FFC383] text-black"
                          : "bg-[#2586e7] text-white"
                      }`
                    : ` ${
                        isDarkMode
                          ? "bg-gray-600 text-black"
                          : "bg-[#09080F]/5 text-[#09080F]/65"
                      }`
                }`}
              >
                {e}
              </button>
            </>
          ))}
        </div>

        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 w-[85%] mx-auto pb-20 pt-7 gap-5">
          {cardData.map((e) => (
            <div
              key={e._id}
              className={`hover:scale-[1.03] duration-300 card card-compact ${
                isDarkMode ? "bg-[#242532]" : "bg-base-100"
              } shadow-xl`}
            >
              <figure>
                <div className="w-full lg:h-[8.8rem] xl:h-[12rem] md:h-[13rem] h-[16rem] sm:h-[10.5rem]">
                  <img
                    src={e.image}
                    alt="Shoes"
                    className="w-full object-cover h-full"
                  />
                </div>
              </figure>
              <div
                className={`p-4 flex flex-col flex-grow justify-between ${
                  isDarkMode ? "text-[#E4E4EB]" : "text-black"
                }`}
              >
                <h2 className="text-[15px] font-normal mb-2">{e.itemName}</h2>
                <h2 className="text-sm font-light leading-[1.4] line-clamp-3">
                  {e.description}
                </h2>
                <Link to={`/detailes/${e._id}`}>
                  <button
                    className={`${
                      isDarkMode
                        ? "bg-gradient-to-t from-[#fd9da7] to-[#F4BD6D] text-black/85"
                        : "bg-gradient-to-b from-[#3871FF] to-[#3036CC] text-white"
                    } 
                    rounded-lg w-full py-2 mt-2.5 font-normal active:scale-95 transition-all cursor-pointer text-sm`}
                  >
                    See More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="w-[80%] mx-auto relative pb-24 mt-10">
          <div className="flex items-center justify-center mt-2 mb-10 flex-col">
            <h1 className="lg:text-2xl text-2xl font-semibold text-center">
              Top Selling Products
            </h1>
            <p className="text-center lg:text-sm text-xs mt-2">
              Discover Our Most Popular Picks Loved by Athletes and Enthusiasts
              Alike. <br /> Shop the Best in Sports Gear Today!
            </p>
          </div>
          <TopSelling data={data}></TopSelling>
        </div>

        <div className="w-[80%] mx-auto relative pb-32">
          <div className="flex items-center justify-center mt-2 mb-10 flex-col">
            <h1 className="lg:text-2xl text-2xl font-semibold text-center">
              What Our Customers Say
            </h1>
            <p className="text-center lg:text-sm text-xs mt-2">
              Read the Experiences of Our Satisfied Customers and Find Out Why
              They <br /> Trust Us for All Their Sports Equipment Needs
            </p>
          </div>
          <Customer></Customer>
        </div>
      </div>
    </>
  );
};

export default Home;
