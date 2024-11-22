import React from "react";

export default function Footer() {
  return (
    <>
      <div className="w-full flex flex-col items-center justify-cente lg:py-20 py-10">
        <h1 className="font-bold text-2xl">Gadget Heaven</h1>
        <p className="text-xs text-black/70 mt-2">
          Leading the way in cutting-edge technology and innovation.
        </p>

        <div className="border border-black/10 w-[85%] my-4"></div>

        <div className="grid grid-cols-3 mt-3 lg:gap-32  text-[#09080F]/60 w-[88%] lg:w-[50%]">
          <ul className="text-center text-xs flex flex-col gap-y-2">
            <li className="text-sm text-black font-semibold mb-3">Services</li>
            <li>Product Support</li>
            <li>Order Tracking</li>
            <li>Shipping & Delivery</li>
            <li>Returns</li>
          </ul>
          <ul className="text-center text-xs flex flex-col gap-y-2">
            <li className="text-sm text-black font-semibold mb-3">Services</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
          <ul className="text-center text-xs flex flex-col gap-y-2">
            <li className="text-sm text-black font-semibold mb-3">Services</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
      </div>
    </>
  );
}
