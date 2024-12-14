import React, { useContext } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../DarkModeProvider/DarkModeProvider";
import { Helmet } from "react-helmet";

const Detailes = () => {
  const data = useLoaderData();
  // console.log(data);
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>{data?.itemName} - EquiSports</title>
      </Helmet>

      <div className="w-[80%] mx-auto py-20">
        <h1 className="text-3xl text-center font-semibold">Product detailes</h1>
        <div className="lg:w-[95%] w-[95%] mx-auto pb-20">
          <div
            className={`flex lg:flex-row flex-col ${
              isDarkMode ? "bg-[#242532]" : "bg-base-100 border border-black/10"
            } items-start rounded-2xl px-7 shadow-xl p-5  w-[80%] mx-auto mt-12 gap-5`}
          >
            <div className="lg:w-[35%]">
              <div className="w-full rounded-lg">
                <img
                  className="w-full object-cover rounded-xl"
                  src={data?.image}
                  alt=""
                />
              </div>
            </div>
            <div className="lg:w-[60%]">
              <h1 className="text-xl font-semibold">{data?.itemName}</h1>
              <h1 className="text-sm my-2">{data?.description}</h1>
              <hr className="pb-2" />
              <div className="flex flex-col gap-0.5">
                <h1 className="text-sm">Category: {data?.categoryName}</h1>

                <h1 className="text-sm">Price: {data?.price}$</h1>
                <h1 className="text-sm">Rating: {data?.rating}/5</h1>
                <h1 className="text-sm">
                  Processing Time: {data?.processingTime} days
                </h1>

                <h1 className="text-sm">
                  Stock Status: {data?.stockStatus} available
                </h1>
                <h1 className="text-sm">
                  customization: {data?.customization}
                </h1>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mt-10">
            <button
              onClick={() => {
                navigate("/");
              }}
              className={`px-5 ${
                isDarkMode
                  ? "bg-gradient-to-t from-[#fc8f9a] to-[#F4BD6D] text-black/85"
                  : "bg-gradient-to-r from-[#007CF5] to-[#007bf5c9] text-white"
              }
              rounded-full py-1.5 text-sm font-semibold cursor-pointer`}
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detailes;
