import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";
import { FaEye } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { FcGoogle } from "react-icons/fc";
import { BsCheckCircleFill } from "react-icons/bs";

const Registration = () => {
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const [eyeIconClicked, seteyeIconClicked] = useState(false);
  const { createUser, signInUser, googleSignIn, toastShow, profileInfo } =
    useContext(AuthContext);
  
    const location = useLocation()

  function handleGoogle() {
    googleSignIn().then((res) => {
      navigate("/");
      toastShow("success", "Welcome!");
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;

    const hasUppercase = /(?=.*[A-Z])/;
    const hasLowercase = /(?=.*[a-z])/;
    const isAtLeast6Chars = /.{6,}/;

    if (!hasUppercase.test(pass)) {
      seterror("at least one uppercase letter");
      return;
    }

    if (!hasLowercase.test(pass)) {
      seterror("at least one lowercase letter");
      return;
    }

    if (!isAtLeast6Chars.test(pass)) {
      seterror("at least 6 characters long");
      return;
    }

    createUser(email, pass)
    .then((res) => {
        profileInfo({ displayName: name, photoURL: photo });
        toastShow("success", "Account created!");
        navigate("/login");
        seterror("");
      })
      .catch((error) => {
        toastShow("error", `Failed to create account: ${error.message}`);
      });
    e.target.reset();
  }

  return (
    <div>
      <Helmet>
        <title>Registration | NextStep</title>
      </Helmet>

      <div className="bg-gradient-to-b from-[#f3f6f900] to-[#DDEBF9] flex lg:flex-row flex-col-reverse items-center justify-center gap-20 relative">
        <div>
          <img
            src="https://i.ibb.co.com/wsWhKGr/c1.png"
            className="absolute top-8 rotate-180 translate-x-12 w-[6%]"
            alt=""
          />
          <img
            src="https://i.ibb.co.com/kHwTXnz/c4.png"
            className="absolute top-20 left-5 rotate-180 translate-x-12 w-[1.2%]"
            alt=""
          />
          <img
            src="https://i.ibb.co.com/jyM26px/c2.png"
            className="absolute top-1 right-40 -translate-x-16 w-[7%]"
            alt=""
          />
        </div>

        <div className=" lg:w-[25%] flex flex-col w-[80%] items-center lg:items-start">
          <div className="w-[70%]">
            <img src="https://i.ibb.co.com/M8W9FvV/register.png" className="w-full" alt="" />
          </div>
          <h1 className="text-lg mt-10 font-semibold">Benefits to Joining:</h1>
          <div className="flex items-center gap-4 text-sm mt-3 text-[black]/60">
            <ul>
              <div className="flex items-center gap-2">
                <BsCheckCircleFill className="text-[#1ABC9C]"></BsCheckCircleFill>
                <li>free resources</li>
              </div>
              <div className="flex items-center gap-2">
                <BsCheckCircleFill className="text-[#1ABC9C] mt-3"></BsCheckCircleFill>
                <li className="mt-3">Best Guidance</li>
              </div>
            </ul>
            <ul>
              <div className="flex items-center gap-2">
                <BsCheckCircleFill className="text-[#1ABC9C]"></BsCheckCircleFill>
                <li>Premium Resources</li>
              </div>
              <div className="flex items-center gap-2">
                <BsCheckCircleFill className="text-[#1ABC9C] mt-3"></BsCheckCircleFill>
                <li className="mt-3">Workshops & Webinars</li>
              </div>
            </ul>
          </div>
        </div>

        <div className="flex lg:flex-row flex-col items-center">
          <div className="pt-16 lg:pb-20 pb-10 flex-col">
            <div className="text-center lg:text-left"></div>
            <div className="card rounded-md bg-base-100 w-full  shrink-0 shadow-2xl">
              <form onSubmit={handleSubmit} className="card-body">
                <h1 className="text-center text-lg font-semibold mb-5">
                  <span className="text-[#007CF5] font-bold">Register</span> Your Account
                </h1>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Name</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="name"
                    className="border border-black/15 p-2 placeholder:text-xs py-2.5
                       rounded-md text-sm focus:outline-black/5"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Email</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="email"
                    className="border border-black/15 p-2 placeholder:text-xs py-2.5
                       rounded-md text-sm focus:outline-black/5"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Photo url</span>
                  </label>
                  <input
                    name="photo"
                    type="text"
                    placeholder="photo"
                    className="border border-black/15 p-2 placeholder:text-xs py-2.5
                       rounded-md text-sm focus:outline-black/5"
                    required
                  />
                </div>
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text font-semibold">Password</span>
                  </label>
                  <input
                    name="password"
                    type={eyeIconClicked ? "text" : "password"}
                    placeholder="password"
                    className="border border-black/15 p-2 placeholder:text-xs py-2.5
                       rounded-md text-sm focus:outline-black/5"
                    required
                  />
                  <FaEye
                    onClick={() => {
                      seteyeIconClicked(!eyeIconClicked);
                    }}
                    className={`absolute top-[3.1rem] right-4 ${eyeIconClicked ? "text-black" : "text-black/40"}`}
                  ></FaEye>
                </div>
                <div><p className="text-xs text-red-600">{error}</p></div>
                <div className="form-control mt-6">
                  <button type="submit" className="bg-[#007CF5] text-white py-2 rounded-sm text-sm">
                    Registration
                  </button>
                  <div className="flex items-center mt-4 text-sm gap-2">
                    <h1>Already user to NextStep?</h1>
                    <h1
                      onClick={() => {
                        navigate("/login");
                      }}
                      className="font-bold text-[#007CF5] cursor-pointer"
                    >
                      Login Now
                    </h1>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center lg:ml-16">
            <h1>or register with</h1>
            <div
              onClick={handleGoogle}
              className="bg-white cursor-pointer px-4 py-2 rounded-xl mt-3 shadow-xl flex flex-col items-center justify-center"
            >
              <FcGoogle className="cursor-pointer text-3xl mt-2">
                Google
              </FcGoogle>
              <h1 className="text-xs mt-0.5">Google</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
