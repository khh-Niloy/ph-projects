import React from "react";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { AiOutlineSafety } from "react-icons/ai";
import { RiRestaurant2Line } from "react-icons/ri";
import { FaUserTie } from "react-icons/fa6";

const AboutUs = () => {
  return (
    <div className="w-[70%] mx-auto mt-16">
      <div className="flex flex-col items-center justify-center mb-10">
        <h1 className="lg:text-3xl text-2xl font-semibold">
          Savor the Excellence
        </h1>
        <p className="lg:text-sm text-xs text-center mt-2">
          Your ultimate destination for exceptional dining and unforgettable
          experiences.
        </p>
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-5">
        <div className="p-5 py-7 bg-[#a855f7]/10 rounded-lg hover:scale-[1.03] duration-300 cursor-pointer">
          <GiForkKnifeSpoon
            className="p-3 bg-gradient-to-br from-[#9642e4] to-purple-300
            text-5xl rounded-full text-white shadow-xl"
          ></GiForkKnifeSpoon>
          <h1 className="text-sm mt-4">
            Fresh, high-quality dishes crafted to perfection.
          </h1>
        </div>
        <div className="p-5 py-7 bg-[#3b82f6]/10 rounded-lg hover:scale-[1.03] duration-300 cursor-pointer">
          <FaUserTie
            className="p-3 bg-gradient-to-br from-[#3b82f6] to-blue-300
            text-5xl rounded-full text-white shadow-xl"
          ></FaUserTie>
          <h1 className="text-sm mt-4">
            Outstanding service that makes every guest feel special.
          </h1>
        </div>
        <div className="p-5 py-7 bg-[#06b6d4]/10 rounded-lg hover:scale-[1.03] duration-300 cursor-pointer">
          <AiOutlineSafety
            className="p-3 bg-gradient-to-br from-[#06b6d4] to-cyan-300
            text-5xl rounded-full text-white shadow-xl"
          ></AiOutlineSafety>
          <h1 className="text-sm mt-4">
            Strict hygiene standards for a safe dining experience.
          </h1>
        </div>
        <div className="p-5 py-7 bg-[#22c55e]/10 rounded-lg hover:scale-[1.03] duration-300 cursor-pointer">
          <RiRestaurant2Line
            className="p-3 bg-gradient-to-br from-[#22c55e] to-green-300
            text-5xl rounded-full text-white shadow-xl"
          ></RiRestaurant2Line>
          <h1 className="text-sm mt-4">
            A cozy ambiance perfect for every occasion.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
