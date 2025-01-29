import React from "react";
import { FaBoxOpen } from "react-icons/fa6";
import { PiMapPinFill } from "react-icons/pi";
import { HiTruck } from "react-icons/hi";
import { MdDeliveryDining } from "react-icons/md";



const Features = () => {
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-3 gap-5">
      <div className="p-5 py-7 bg-[#a855f7]/10 rounded-lg">
        <FaBoxOpen
          className="p-3 bg-gradient-to-br from-[#9642e4] to-purple-300
            text-5xl rounded-full text-white shadow-xl"
        ></FaBoxOpen>
        <h1 className="text-md mt-4 font-medium">Seamless Parcel Booking</h1>
        <p className="text-sm mt-2 font-light">
          Book your parcel for delivery in just a few clicks with our
          user-friendly interface.
        </p>
      </div>
      <div className="p-5 py-7 bg-[#3b82f6]/10 rounded-lg">
        <PiMapPinFill
          className="p-3 bg-gradient-to-br from-[#3b82f6] to-blue-300
            text-5xl rounded-full text-white shadow-xl"
        ></PiMapPinFill>
        <h1 className="text-md mt-4 font-medium">Live Parcel Tracking</h1>
        <p className="text-sm mt-2 font-light">
          Stay updated with live parcel location and delivery status at every
          step.
        </p>
      </div>
      <div className="p-5 py-7 bg-[#06b6d4]/10 rounded-lg">
        <MdDeliveryDining
          className="p-3 bg-gradient-to-br from-[#06b6d4] to-cyan-300
            text-5xl rounded-full text-white shadow-xl"
        ></MdDeliveryDining>
        <h1 className="text-md mt-4 font-medium">Efficient Delivery System</h1>
        <p className="text-sm mt-2 font-light">
          Enjoy prompt and secure parcel delivery with our trusted delivery
          partners.
        </p>
      </div>
    </div>
  );
};

export default Features;
