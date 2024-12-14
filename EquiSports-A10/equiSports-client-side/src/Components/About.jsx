import React from "react";
import { IoIosFootball } from "react-icons/io";

import { TfiStatsUp } from "react-icons/tfi";

import { AiOutlineSafety } from "react-icons/ai";
import { MdGroups } from "react-icons/md";
import { HiOutlineCheckCircle } from "react-icons/hi";

const About = () => {
  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 gap-5">
      <div className="p-5 py-7 bg-[#a855f7]/10 rounded-lg">
        <IoIosFootball
          className="p-3 bg-gradient-to-br from-[#9642e4] to-purple-300
            text-5xl rounded-full text-white shadow-xl"
        ></IoIosFootball>
        <h1 className="text-sm mt-4">
          High-quality gear for every sport and fitness level.
        </h1>
      </div>
      <div className="p-5 py-7 bg-[#3b82f6]/10 rounded-lg">
        <TfiStatsUp
          className="p-3 bg-gradient-to-br from-[#3b82f6] to-blue-300
            text-5xl rounded-full text-white shadow-xl"
        ></TfiStatsUp>
        <h1 className="text-sm mt-4">
          Improve your performance with precision equipment.
        </h1>
      </div>
      <div className="p-5 py-7 bg-[#06b6d4]/10 rounded-lg">
        <AiOutlineSafety
          className="p-3 bg-gradient-to-br from-[#06b6d4] to-cyan-300
            text-5xl rounded-full text-white shadow-xl"
        ></AiOutlineSafety>
        <h1 className="text-sm mt-4">
          Prioritize safety with trusted protective equipment.
        </h1>
      </div>
      <div className="p-5 py-7 bg-[#22c55e]/10 rounded-lg">
        <HiOutlineCheckCircle
          className="p-3 bg-gradient-to-br from-[#22c55e] to-green-300
            text-5xl rounded-full text-white shadow-xl"
        ></HiOutlineCheckCircle>
        <h1 className="text-sm mt-4">
          Champion-grade equipment for every athlete.
        </h1>
      </div>
    </div>
  );
};

export default About;
