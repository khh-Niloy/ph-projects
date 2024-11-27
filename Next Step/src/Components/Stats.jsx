import React from "react";
import { RiTeamFill } from "react-icons/ri";
import { IoIosHappy } from "react-icons/io";
import { TbCircleCheckFilled } from "react-icons/tb";

const Stats = () => {
  return (
    <div className="w-[95%] mx-auto mb-16 rounded-lg">
      <h1 className="text-4xl font-bold text-center"><span className="text-[#F83179]">Our Journey</span> in Numbers</h1>

      <div className="w-[60%] mx-auto grid md:grid-cols-3 mt-7">
        <div className="flex items-center flex-col gap-3 py-14 bg-[#eab2080f] 
        bg-gradient-to-b from-[#eab2080f] to-white
        ">
          <RiTeamFill className="text-[#eab308] text-2xl shadow-xl rounded-full"></RiTeamFill>
          <h1 className="text-4xl md:text-3xl lg:text-4xl font-bold">98+</h1>
          <p className="text-xs text-center">Team <br /> Members</p>
        </div>

        <div className="flex items-center flex-col gap-3 bg-[#3b83f60f] py-14
        bg-gradient-to-b from-[#3b83f60f] to-white">
          <IoIosHappy className="text-[#3b82f6] text-2xl shadow-xl rounded-full"></IoIosHappy>
          <h1 className="text-4xl md:text-3xl lg:text-4xl font-bold">102k+</h1>
          <p className="text-xs text-center">Happy
          <br /> Customers</p>
        </div>

        <div className="flex items-center flex-col gap-3 py-14 bg-[#22c55e0f]
        bg-gradient-to-b from-[#22c55e0f] to-white">
          <TbCircleCheckFilled className="text-[#22c55e] text-2xl shadow-xl rounded-full"></TbCircleCheckFilled>
          <h1 className="text-4xl md:text-3xl lg:text-4xl font-bold">103k+</h1>
          <p className="text-xs text-center">Course <br /> purchased</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
