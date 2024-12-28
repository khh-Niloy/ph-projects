import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Slider from "../Components/Slider";
import Customer from "../Components/Customer";
import { DarkModeContext } from "../DarkModeProvider/DarkModeProvider";
import About from "../Components/About";

const Home = () => {
  const { isDarkMode } = useContext(DarkModeContext);

  async function fetchFoodData() {
    const { data } = await axios.get(
      `https://madchef-server-side.vercel.app/allfood`
    );
    return data;
  }

  const {
    data: homeData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["homefood"],
    queryFn: fetchFoodData,
  });

  const filterData = homeData
    .sort(function (a, b) {
      return b.purchase_count - a.purchase_count;
    })
    .slice(0, 6);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="relative flex items-center justify-center lg:h-[32rem] h-[26rem] w-full">
        <img
          className="object-cover lg:h-[32rem] h-[26rem] w-full"
          src="https://i.ibb.co.com/nLdV4bS/content.png"
          alt=""
        />

        <div
          className={`absolute ${
            isDarkMode && "text-black"
          } lg:w-[60%] text-center flex items-center flex-col justify-center`}
        >
          <div>
            <h1 className="lg:text-5xl text-4xl font-semibold text-[#ff2727]">
              Madchef
            </h1>
            <p className={`lg:text-5xl text-4xl font-semibold`}>
              Crafting Flavor Magic
            </p>
          </div>
          <p className="text-sm mt-3 w-[80%]">
            Dive into a culinary journey where every dish tells a story, crafted
            with the freshest ingredients and a touch of innovation. Experience
            the art of flavor!
          </p>

          <Link to="/allfood">
            <button className="bg-[#FF2727] text-white text-xs px-3 py-1.5 mt-3 rounded-full">
              See All Foods
            </button>
          </Link>
        </div>
      </div>

      <div className="w-[90%] lg:w-[75%] mx-auto mt-20 mb-20">
        <div className="text-center mb-8">
          <h1 className="lg:text-4xl text-2xl font-semibold">
            Tempt Your Taste Buds
          </h1>
          <p className="lg:text-sm text-xs mt-2">
            Explore an irresistible collection of mouthwatering dishes, <br />{" "}
            crafted with passion and bursting with flavors to delight your
            senses
          </p>
        </div>
        <Slider></Slider>
      </div>

      <div className="w-[90%] lg:w-[80%] mx-auto pb-20 lg:pt-8 pt-16">
        <div className="mb-12 text-center">
          <h1 className="text-center font-semibold lg:text-4xl text-2xl">
            Top 6 best-selling food items{" "}
            <span className="text-xs font-normal">(by purchase count)</span>
          </h1>
          <p className="lg:text-sm text-xs mt-2">
            Discover the Top 6 Best-Selling Food Items That Have Captivated{" "}
            <br />
            Taste Buds Everywhere and Become Absolute Favorites
          </p>
        </div>

        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-5 w-[90%] lg:w-[80%] mx-auto">
          {filterData.map((e) => (
            <div
              key={e._id}
              className={`card card-compact bg-base-100 shadow-xl ${
                isDarkMode && "text-black"
              }`}
            >
              <figure className="h-[10rem] drop-shadow-xl relative">
                <p className="text-[9px] left-3 bottom-3 drop-shadow-xl font-medium absolute bg-white px-3 py-1 rounded-lg">
                  Purchase Count: {e.purchase_count}
                </p>
                <img
                  className="object-cover rounded-2xl w-full h-[10rem]"
                  src={e.photo}
                  alt="Shoes"
                />
              </figure>
              <div key={e._id} className="p-4">
                <h2 className="card-title">{e.foodname}</h2>
                <p className="text-sm">Price: ${e.price}</p>
                <p className="line-clamp-2 text-sm mt-1">{e.description}</p>
                <div className="card-actions justify-end">
                  <Link
                    className="w-full"
                    to={`/allfood/foodDetailes/${e._id}`}
                  >
                    <button className="btn hover:bg-[#FF2727] btn-neutral hover:border-none text-white w-full mt-2">
                      Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center mt-20">
          <Link to={`/allfood`}>
            <button className="px-5 py-2 text-white rounded-lg bg-[#FF2727] hover:bg-[#FF2727]/80">
              See All
            </button>
          </Link>
        </div>

        <div className="w-[85%] mx-auto mt-24">
          <div className="flex flex-col items-center justify-center mb-10">
            <h1 className="lg:text-3xl text-2xl font-semibold">
              Savor the Excellence
            </h1>
            <p className="lg:text-sm text-xs text-center mt-2">
              Your ultimate destination for exceptional dining and unforgettable
              experiences.
            </p>
          </div>
          <About></About>
        </div>

        <div className="w-[100%] lg:w-[80%] mx-auto pb-10">
          <div className="flex items-center justify-center mt-28 mb-10 flex-col">
            <h1 className="lg:text-4xl text-2xl font-semibold text-center">
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
    </div>
  );
};

export default Home;
