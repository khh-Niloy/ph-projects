import React, { useContext } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../DarkModeProvider/DarkModeProvider";
import { Helmet } from "react-helmet";

const Detailes = () => {
  const data = useLoaderData();
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>{data?.itemName} - EquiSports</title>
      </Helmet>

      <div className="w-full mx-auto py-20">
        <h1 className="text-3xl text-center font-semibold mt-5">
          Product detailes
        </h1>
        <div className="lg:w-[95%] w-[95%] mx-auto pb-20">
          <div
            className={`flex lg:flex-row flex-col ${
              isDarkMode ? "bg-[#242532]" : "bg-base-100 border border-black/10"
            } items-start rounded-2xl px-2 shadow-xl p-2  w-[80%] mx-auto mt-8 gap-5`}
          >
            <div className="lg:w-[50%]">
              <div className="w-full rounded-lg">
                <img
                  className="w-full object-cover rounded-xl"
                  src={data?.image}
                  alt=""
                />
              </div>
            </div>
            <div className="lg:w-[50%]">
              <h1 className="text-xl font-semibold">{data?.itemName}</h1>
              <h1 className="text-sm my-2">{data?.description}</h1>
              <hr className="pb-2" />
              <div className="flex flex-col gap-0.5">
                <h1 className="text-sm">Category: {data?.categoryName}</h1>

                <h1 className="text-sm">Price: ${data?.price}</h1>
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
          <div className="flex items-center justify-center mt-10"></div>
          <div className="w-[90%] mx-auto">
            <div className="divider "></div>
            <p className="text-sm leading-6">{data?.briefdescription}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detailes;
