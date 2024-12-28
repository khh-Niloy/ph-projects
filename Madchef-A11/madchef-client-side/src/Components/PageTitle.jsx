import React from "react";

const PageTitle = ({ image, text, subtext }) => {
  return (
    <div>
      <div className="w-full h-[15rem] relative">
        <div className="bg-gradient-to-t from-[#000000ef] to-[#00000044] absolute w-full h-full flex items-center justify-center">
          <div className="text-white text-center flex flex-col items-center justify-center">
            <h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-3xl font-medium mb-2 duration-300">
              {text}
            </h1>
            <p className="md:text-sm text-xs md:w-full w-[80%] font-normal">
              {subtext}
            </p>
          </div>
        </div>
        <img className="object-cover w-full h-[15rem]" src={image} alt="" />
      </div>
    </div>
  );
};

export default PageTitle;
