import React from "react";
import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";
import { LuClock3 } from "react-icons/lu";

const Resources = () => {
  const { videosData, blogData } = useLoaderData();

  return (
    <>
      <Helmet>
        <title>Free Resources | NextStep</title>
      </Helmet>
      <div className="w-[80%] mx-auto mt-16 pb-20">
        <div>
          <h1 className="text-3xl mb-7 font-bold">
            Helpful <span className="text-[#1888F5]">Links</span>
          </h1>
          <div className="grid lg:grid-cols-4 grid-cols-1 gap-5">
            {blogData.map((e, index) => (
              <div key={index} className="card rounded-lg hover:shadow-xl duration-300 card-compact bg-base-100 
              shadow-sm border border-black/5">
                <figure>
                  <img src={e.image} alt="Shoes" />
                </figure>
                <div key={index} className="card-body justify-between">
                  <h2 className="text-lg font-semibold">{e.website_name}</h2>
                  <p className="text-xs">{e.short_description}</p>
                  <div className="flex items-center gap-1">
                    <LuClock3 className="text-xs text-[#1888F5]"></LuClock3>
                    <p className="text-xs">{e.min} mins read</p>
                  </div>
                  <div className="card-actions justify-start">
                    <a
                      href={e.link}
                      target="_blank"
                      className="hover:underline mt-2 hover:text-[#1888F5] duration-200"
                    >
                      learn more
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-10"/>

        <div className="">
          <h1 className="text-3xl mb-7 font-bold">
            Watch & <span className="text-[#1888F5]">Learn</span>
          </h1>
          <div className="grid lg:grid-cols-4 grid-cols-1 gap-5">
            {videosData.map((e, index) => (
              <div key={index} className="card card-compact bg-base-100 hover:shadow-xl duration-300 shadow-sm border border-black/5">
                <figure>
                  <img src={e.image} alt="Shoes" />
                </figure>
                <div key={index} className="card-body justify-between">
                  <h1 className="text-xs">{e.name}</h1>
                  <div className="card-actions justify-start">
                    <a href={e.link} target="_blank">
                      <button className="bg-black/80 hover:bg-black/40 duration-300 text-white text-xs px-3 py-1.5 rounded-full">
                        Watch Now
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Resources;
