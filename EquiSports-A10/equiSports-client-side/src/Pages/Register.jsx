import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";
import bg from "../assets/bgg.svg";
import { FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { DarkModeContext } from "../DarkModeProvider/DarkModeProvider";
import gradient from "../assets/grad.svg";
import { Helmet } from "react-helmet";

const Register = () => {
  const { createUser, profileInfo, googleSignIn, toastShow } =
    useContext(AuthContext);
  const [error, seterror] = useState("");
  const [eyeIconClicked, seteyeIconClicked] = useState(false);
  const navigate = useNavigate();
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);

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

    const updateProfile = {
      displayName: name,
      photoURL: photo,
    };

    createUser(email, pass)
      .then((res) => {
        // console.log(res);
        profileInfo(updateProfile);
        navigate("/");
        toastShow("success", "Account created successfully!");
        e.target.reset();
        seterror("");
      })
      .catch((err) => {
        // console.log(err);
        toastShow("error", `${err}`);
      });
  }

  function handleGoogle() {
    googleSignIn().then((res) => {
      // console.log(res);
      navigate("/");
      toastShow("success", "Registration successful!");
    });
  }

  return (
    <>
      <Helmet>
        <title>Register - EquiSports</title>
      </Helmet>

      <div>
        <div
          className={`${
            isDarkMode
              ? "bg-[#191A23]"
              : "bg-gradient-to-b from-[#f3f6f900] to-[#DDEBF9]"
          } flex lg:flex-row flex-col items-center justify-center relative`}
        >
          <div className="flex flex-col lg:items-start items-center mt-10 lg:mt-0">
            <h1 className="lg:text-5xl text-3xl font-bold">Gear Up Today!</h1>
            <p className="mt-2 mb-5 text-xs lg:text-sm">
              Join us and access the best accessories for every sport!
            </p>

            <img src={bg} className="lg:w-[70%] w-[55%] lg:mt-5" alt="" />
          </div>

          <div className="flex flex-col lg:flex-row items-center relative z-20">
            <div className="pt-16 lg:pb-20 pb-10 flex-col relative z-20">
              <div className="text-center lg:text-left"></div>
              <div className="rounded-md bg-base-100 w-full shrink-0 shadow-2xl">
                <img
                  className={`absolute top-[8rem] left-[1rem] -z-10 scale-[2] w-[100%] ${
                    isDarkMode ? "flex" : "hidden"
                  }`}
                  src={gradient}
                  alt=""
                />

                <form
                  onSubmit={handleSubmit}
                  className=" p-6 px-10 relative z-50"
                >
                  <h1
                    className={`text-center text-lg font-semibold mb-5 text-black`}
                  >
                    <span className="text-[#007CF5] font-bold">Register</span>{" "}
                    Your Account
                  </h1>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="name"
                      className="border border-black/15 p-2 placeholder:text-xs py-2.5
                       rounded-md text-sm focus:outline-black/5 text-black"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="email"
                      className="border border-black/15 p-2 placeholder:text-xs py-2.5
                       rounded-md text-sm focus:outline-black/5 text-black"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Photo URL
                      </span>
                    </label>
                    <input
                      type="text"
                      name="photo"
                      placeholder="photo"
                      className="border border-black/15 p-2 placeholder:text-xs py-2.5
                       rounded-md text-sm focus:outline-black/5 text-black"
                      required
                    />
                  </div>
                  <div className="form-control mt-2 relative">
                    <label className="label">
                      <span className="label-text font-semibold">Password</span>
                    </label>
                    <input
                      name="password"
                      type={eyeIconClicked ? "text" : "password"}
                      placeholder="password"
                      className="border border-black/15 p-2 placeholder:text-xs py-2.5
                       rounded-md text-sm focus:outline-black/5 text-black"
                      required
                    />
                    <FaEye
                      onClick={() => {
                        seteyeIconClicked(!eyeIconClicked);
                      }}
                      className={`absolute top-[3.1rem] right-4 ${
                        eyeIconClicked ? "text-black" : "text-black/40"
                      }`}
                    ></FaEye>
                    <p className="text-red-600 text-xs mt-2">{error}</p>
                  </div>
                  <div className="form-control mt-6">
                    <button
                      type="submit"
                      className="bg-[#007CF5] text-white py-2.5 rounded-sm text-sm"
                    >
                      Registration
                    </button>
                    <button
                      onClick={handleGoogle}
                      className=" py-2 rounded-sm border border-black/15 flex items-center justify-center text-sm mt-2"
                    >
                      <FcGoogle className="text-2xl"></FcGoogle>{" "}
                      <h1 className="ml-1 text-black">Google</h1>
                    </button>
                  </div>
                  <div className="flex items-center mt-4 text-sm gap-2">
                    <h1 className="text-black">Already user to EquiSports?</h1>
                    <h1
                      onClick={() => {
                        navigate("/login");
                      }}
                      className="font-bold text-[#007CF5] cursor-pointer"
                    >
                      login
                    </h1>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
