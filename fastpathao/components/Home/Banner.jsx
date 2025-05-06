"use client";
import React from "react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Smile } from "lucide-react";
import { Truck } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

export default function Banner() {
  const people = [
    {
      id: 1,
      name: "John Doe",
      designation: "delivery on time!",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
      id: 2,
      name: "Robert Johnson",
      designation: "Parcel arrived safely!",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 5,
      name: "Tyler Durden",
      designation: "Everything's in perfect condition!",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
    },
  ];
  return (
    <div className="w-full h-[560px] bg-[url('/bannersvg.svg')] relative bg-no-repeat bg-center bg-contain">
      <div className="absolute right-10 top-17 p-2 px-3 pb-3 rounded-xl bg-[white]">
        <p className="text-black mb-3">Our Stats</p>
        <img src="/bar.png" className="w-52 rounded-md shadow-2xl" alt="" />
      </div>
      <div className="px-20 py-16">
        <h1 className="text-5xl font-bold tracking-tight">
          Your Parcel, <br />{" "}
          <span className="text-[#0167FF]">Our Priority</span>
        </h1>
        <div className="flex gap-2 mt-3 text-[10px]">
          <button className="hero-button border border-[#0167ff]/10 rounded-xl">
            Easy Booking
          </button>
          <button className="hero-button border border-[#0167ff]/10 rounded-xl">
            Reliable
          </button>
          <button className="hero-button border border-[#0167ff]/10 rounded-xl">
            Real-time Update
          </button>
        </div>
        <div className="flex space-x-4 items-center w-full max-w-md">
          <div className="bg-white rounded-2xl px-3 py-3 flex items-center space-x-4 flex-1 mt-3 hover:shadow-2xl duration-300 transition-all">
            <div className="bg-[#F4F8FE] p-2 rounded-lg">
              <Truck size={20} className="text-[#0167FF]" />
            </div>
            <div>
              <div className="text-gray-400 text-sm">Safely Delivered</div>
              <div className=" text-black font-semibold">99%</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl px-3 py-3 flex items-center space-x-4 flex-1 mt-3 hover:shadow-2xl duration-300 transition-all">
            <div className="bg-[#F4F8FE] p-2 rounded-lg">
              <Smile size={20} className="text-[#0167FF]" />
            </div>
            <div>
              <div className="text-gray-400 text-sm">Customer Happiness</div>
              <div className=" text-black font-semibold">95%</div>
            </div>
          </div>
        </div>

        <p className="text-black/80 text-xs mb-3 mt-9">Our Happy Customers!</p>
        <div className="flex flex-row items-start justify-start mb-10 w-full ">
          <AnimatedTooltip items={people} />
        </div>
        <button
          className={`py-3 px-6 text-xs bg-[#0167FF] text-white rounded-xl hover:shadow-2xl duration-300 transition-all cursor-pointer hover:bg-[#0167FF]/80`}
        >
          <div className="flex justify-center items-center gap-1">
            Book Your Parcel Now
            <ArrowUpRight
              size={17}
              className="hover:translate-x-0.5 transition-transform duration-500"
            />
          </div>
        </button>
      </div>
    </div>
  );
}
