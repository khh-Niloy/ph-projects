import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContextProvider";
import { FaEye } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { DarkModeContext } from "../../DarkModeProvider/DarkModeProvider";

const Login = () => {
  const { signInUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isClicked, setisClicked] = useState(false);
  const location = useLocation();
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);

  function handleSubmit(e) {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then((res) => {
        toast.success("Welcome back!");
        location.state ? navigate(`${location.state}`) : navigate(`/`);
      })
      .catch((err) => {
        toast.error(`${err}`);
      });
  }

  function handleGoogle() {
    googleSignIn()
      .then((res) => {
        toast.success("Welcome back!");
        location.state ? navigate(`${location.state}`) : navigate(`/`);
      })
      .catch((err) => {
        toast.error(`${err}`);
      });
  }

  return (
    <div
      className={`z-10 relative bg-[url('https://img.freepik.com/free-photo/side-view-fried-meat-with-french-fries-ketchup_141793-4908.jpg?t=st=1735155958~exp=1735159558~hmac=ac21c60014a4072f8e1d91e378ef64e152b728427161ad87a667522bccdc449b&w=900')] bg-cover bg-center w-full ${
        isDarkMode && "text-black"
      }`}
    >
      <div className="w-full h-full bg-black/75 z-0 absolute"></div>

      <div className="flex lg:w-[80%] w-[85%] mx-auto py-10 md:flex-row flex-col-reverse">
        <div className="md:w-1/2 z-40 md:flex hidden">
          <div className=" lg:h-[33rem] md:h-[34rem]">
            <img
              className="z-40 object-cover w-full lg:h-[33rem] md:h-[34rem] rounded-tl-2xl rounded-bl-2xl"
              src="https://img.freepik.com/free-photo/side-view-fried-meat-with-french-fries-ketchup_141793-4908.jpg?t=st=1735155958~exp=1735159558~hmac=ac21c60014a4072f8e1d91e378ef64e152b728427161ad87a667522bccdc449b&w=900"
              alt=""
            />
          </div>
        </div>

        <div className="z-10 md:w-1/2 border border-black/20 md:rounded-tr-2xl md:rounded-br-2xl md:rounded-bl-none md:rounded-tl-none rounded-2xl px-10 py-8 bg-white">
          <div className="text-left mb-5">
            <h1 className="text-4xl font-bold">Welcome!</h1>
            <p className="text-xs">Please login to your account</p>
          </div>
          <form onSubmit={handleSubmit} className="">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control relative mt-3">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={isClicked ? "text" : "password"}
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <FaEye
                onClick={() => {
                  setisClicked(!isClicked);
                }}
                className="absolute top-[3.3rem] right-5 cursor-pointer"
              ></FaEye>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button
                className="border border-black rounded-xl
              py-2.5 bg-[#E8252E] mb-3 border-none text-white font-medium hover:shadow-xl hover:scale-[1.01] duration-300"
              >
                Login
              </button>
            </div>
          </form>
          <div className="flex flex-col">
            <button
              onClick={() => {
                handleGoogle();
              }}
              className="py-2.5 rounded-xl flex items-center justify-center border border-black/30 hover:shadow-xl hover:scale-[1.01] duration-300"
            >
              <FcGoogle className="text-2xl"></FcGoogle>{" "}
              <h1 className="ml-1 text-black">Google</h1>
            </button>
            <div className="flex items-center mt-4 text-md gap-2">
              <h1>New user to Madchef?</h1>
              <Link to="/register">
                <h1 className="font-bold text-[#E8252E] cursor-pointer">
                  Register
                </h1>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default Login;
