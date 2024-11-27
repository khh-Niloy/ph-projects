import React from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { AiOutlineSolution } from "react-icons/ai";
import { GiNetworkBars } from "react-icons/gi";
import { MdGroups } from "react-icons/md";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { BiDollarCircle } from "react-icons/bi";

const About = () => {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-2 gap-5">
      <div className="p-5 py-7 bg-[#a855f7]/10 rounded-lg">
        <FaChalkboardTeacher
          className="p-3 bg-gradient-to-br from-[#9642e4] to-purple-300
            text-5xl rounded-full text-white shadow-xl"
        ></FaChalkboardTeacher>
        <h1 className="text-sm mt-4">
          Personalized advice from industry experts.
        </h1>
      </div>
      <div className="p-5 py-7 bg-[#3b82f6]/10 rounded-lg">
        <AiOutlineSolution
          className="p-3 bg-gradient-to-br from-[#3b82f6] to-blue-300
            text-5xl rounded-full text-white shadow-xl"
        ></AiOutlineSolution>
        <h1 className="text-sm mt-4">
          Plan your career with precision and clarity.
        </h1>
      </div>
      <div className="p-5 py-7 bg-[#06b6d4]/10 rounded-lg">
        <GiNetworkBars
          className="p-3 bg-gradient-to-br from-[#06b6d4] to-cyan-300
            text-5xl rounded-full text-white shadow-xl"
        ></GiNetworkBars>
        <h1 className="text-sm mt-4">
          Boost your skills with professional insights.
        </h1>
      </div>
      <div className="p-5 py-7 bg-[#ef4444]/10 rounded-lg">
        <MdGroups
          className="p-3 bg-gradient-to-br from-[#ef4444] to-red-300
            text-5xl rounded-full text-white shadow-xl"
        ></MdGroups>
        <h1 className="text-sm mt-4">
          Connect with mentors to grow your network.
        </h1>
      </div>
      <div className="p-5 py-7 bg-[#22c55e]/10 rounded-lg">
        <HiOutlineCheckCircle
          className="p-3 bg-gradient-to-br from-[#22c55e] to-green-300
            text-5xl rounded-full text-white shadow-xl"
        ></HiOutlineCheckCircle>
        <h1 className="text-sm mt-4">
          Achieve your goals with actionable advice.
        </h1>
      </div>
      <div className="p-5 py-7 bg-[#eab308]/10 rounded-lg">
        <BiDollarCircle
          className="p-3 bg-gradient-to-br from-[#eab308] to-yellow-300
            text-5xl rounded-full text-white shadow-xl"
        ></BiDollarCircle>
        <h1 className="text-sm mt-4">
          Learn strategies to manage your finances effectively.
        </h1>
      </div>
    </div>
  );
};

export default About;
