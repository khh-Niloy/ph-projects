import React, { useContext } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { DarkModeContext } from "../DarkModeProvider/DarkModeProvider";
import gradient from "../assets/grad.svg";
import logo from "../assets/logo.svg";

const Footer = () => {
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);

  return (
    <div>
      <footer
        className={`w-full flex flex-col items-center justify-center relative ${
          isDarkMode
            ? "bg-[#191A23] text-white"
            : "bg-gradient-to-br from-[#D7E8F9] to-[#f4f6f9e7]"
        } text-base-content p-10 pt-40 pb-20`}
      >
        <div className="flex items-center flex-col mx-auto gap-10">
          <img
            src={gradient}
            className={`absolute bottom-0 w-full lg:-left-44 -left-[13rem] lg:w-[60%] z-0 ${
              isDarkMode ? "flex" : "hidden"
            }`}
            alt=""
          />

          <aside className="flex items-center flex-col gap-2 z-20 relative">
            <div className="flex items-center gap-2">
              <img className="w-[20%]" src={logo} alt="" />
              <h1 className="text-3xl font-bold">EquiSports</h1>
            </div>

            <h1
              className={`text-xl ${
                isDarkMode ? "text-white" : " text-black/60"
              }`}
            >
              <span
                className={`font-medium ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Mail
              </span>{" "}
              for any query
            </h1>

            <form className="shadow-xl text-black">
              <fieldset className=" bg-white">
                <div className="">
                  <input
                    type="text"
                    placeholder="enter your email"
                    className="p-2 placeholder:text-xs"
                  />
                  <button className="bg-[#007CF5] text-white text-xs mr-2 px-3 mb-1.5 py-2">
                    Submit
                  </button>
                </div>
              </fieldset>
            </form>
          </aside>

          <div className="flex lg:flex-row flex-col lg:gap-20 gap-10 mt-10 lg:mt-16 z-20 relative">
            <nav className="flex flex-col">
              <h6
                className={`text-[19px] font-semibold mb-4 ${
                  isDarkMode ? "text-[#FFC383]" : "text-black"
                }`}
              >
                Contact info
              </h6>
              <div
                className={`flex flex-col gap-2 ${
                  isDarkMode ? "text-white" : "text-black/50"
                } t text-sm`}
              >
                <h1>Email Address: equiSports01@gmail.com</h1>
                <h1>Phone Number: 01915910241</h1>
                <h1>
                  Address: House 113, Road 11, Block E, Banani, Dhaka 1213,
                  Bangladesh.
                </h1>
                <h1>Support Hours: Mon-Fri: 9 AM - 6 PM</h1>
              </div>
            </nav>
            <nav className="flex flex-col">
              <h1
                className={`text-[19px] font-semibold mb-4 ${
                  isDarkMode ? "text-[#FFC383]" : "text-black"
                }`}
              >
                social media links
              </h1>
              <ul className="flex items-center gap-2 text-2xl">
                <li>
                  <FaFacebook className="text-blue-600 cursor-pointer"></FaFacebook>
                </li>
                <li>
                  <FaXTwitter className=" cursor-pointer"></FaXTwitter>
                </li>
                <li>
                  <FaLinkedinIn className="text-[#057AB9] cursor-pointer"></FaLinkedinIn>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <h1
          className={`pt-36 text-center text-sm z-50 ${
            isDarkMode ? "text-white" : "text-black/50"
          }`}
        >
          Copyright © 2024, EquiSports. <br />
          EquiSports is a registered trademark of EquiSports. All rights
          reserved.
        </h1>
      </footer>
    </div>
  );
};

export default Footer;
