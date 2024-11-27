import React, { useContext, useRef } from "react";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";
import { Helmet } from "react-helmet";

const Cards = () => {
  const servicesData = useLoaderData();
  const { user } = useContext(AuthContext);
  const location = useLocation()

  return (
    <>
      <div id="journey" className="flex items-center justify-center text-center flex-col mb-10">
        <h1 className="text-4xl font-bold text-[#1876F4]">
          Our Professional Career Services
        </h1>
        <p className="text-sm mt-2 w-[80%] lg:w-full">
          Explore tailored solutions to help you achieve your career goals
        </p>
      </div>

      <div className="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:pb-20">
        {servicesData.map((e, index) => (
          <div key={index} className="p-4">
            <div className="card bg-base-100 border border-black/10 hover:shadow-md duration-300">
              <figure>
                <div className="w-full xl:h-[11.5rem] lg:h-[9.7rem] md:h-[12rem]">
                  <img
                    src={e.image}
                    alt="Shoes"
                    className="w-full object-cover"
                  />
                </div>
              </figure>
              <div className="pb-6 px-5 pt-3.5 flex flex-col justify-between">
                <h1 className="text-lg font-semibold">{e.serviceName}</h1>
                <div className="flex flex-col gap-[1px] mt-2 mb-2">
                  <h1 className="text-sm">{e.category}-Based Program</h1>
                  <h1 className="text-sm">{e.pricing}</h1>
                  <h1 className="text-sm">Instructor: {e.counselor}</h1>
                </div>
                <Link to={`/card/${e.id}`}>
                  <button className="bg-black/80 px-4 py-1.5 
                  rounded-full text-white text-[12.5px] mt-2">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cards;
