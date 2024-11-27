import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="w-full  flex flex-col items-center justify-center bg-gradient-to-br from-[#D7E8F9] to-[#f4f6f9e7] text-base-content p-10 pt-40 pb-20">
        <div className="flex lg:flex-row flex-col mx-auto gap-10">


          
          <aside className="flex items-start flex-col gap-2 lg:mr-32 mr-0">
            <div className="flex items-center gap-2">
              <img className="w-[30%]" src="https://i.ibb.co.com/TWDy2kf/logo.png" alt="" />
              <h1 className="text-3xl font-bold">NextStep</h1>
            </div>

            <h1 className="text-xl text-black/60">
              <span className="font-medium text-black">Subscribe</span> to our newsletter
            </h1>

            <form className="shadow-xl">
              <fieldset className=" bg-white">
                <div className="">
                  <input
                    type="text"
                    placeholder="enter your email"
                    className="p-2 placeholder:text-xs"
                  />
                  <button className="bg-[#007CF5] text-white text-xs mr-2 px-3 mb-1.5 py-2">
                    Subscribe
                  </button>
                </div>
              </fieldset>
            </form>

            <ul className="flex items-center gap-2 text-2xl mt-7">
              <li>
                <FaFacebook className="text-blue-600"></FaFacebook>
              </li>
              <li>
                <FaXTwitter></FaXTwitter>
              </li>
              <li>
                <FaLinkedinIn className="text-[#057AB9]"></FaLinkedinIn>
              </li>
            </ul>
          </aside>



          <div className="flex lg:flex-row flex-col lg:gap-20 gap-10 mt-10 lg:mt-0">
            <nav className="flex flex-col">
              <h6 className="text-[19px] font-semibold mb-4">Services</h6>
              <div className="flex flex-col gap-4 text-black/50 text-sm">
                <a className="link link-hover">Career Guidance</a>
                <a className="link link-hover">Skill Development</a>
                <a className="link link-hover">Resume Building</a>
                <a className="link link-hover">Interview Prep</a>
              </div>
            </nav>
            <nav className="flex flex-col">
              <h6 className="text-[19px] font-semibold mb-4">Company</h6>
              <div className="flex flex-col gap-4 text-black/50 text-sm">
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
              </div>
            </nav>
            <nav className="flex flex-col">
              <h6 className="text-[19px] font-semibold mb-4">Legal</h6>
              <div className="flex flex-col gap-4 text-black/50 text-sm">
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
              </div>
            </nav>
          </div>
        </div>
          <h1 className="pt-36 text-center text-sm text-black/50">Copyright © 2024, NextStep. <br />
          NextStep is a registered trademark of NextStep. All rights reserved.</h1>
      </footer>
    </div>
  );
};

export default Footer;
