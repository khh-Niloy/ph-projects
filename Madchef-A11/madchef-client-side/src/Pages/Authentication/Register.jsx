import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContextProvider";
import { FaEye } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { DarkModeContext } from "../../DarkModeProvider/DarkModeProvider";

const Register = () => {
  const { createUser, profileInfo, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const [isClicked, setisClicked] = useState(false);
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);

  function handleSubmit(e) {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    const hasUppercase = /(?=.*[A-Z])/;
    const hasLowercase = /(?=.*[a-z])/;
    const isAtLeast6Chars = /.{6,}/;

    if (!hasUppercase.test(password)) {
      seterror("*at least one uppercase letter");
      return;
    }

    if (!hasLowercase.test(password)) {
      seterror("*at least one lowercase letter");
      return;
    }

    if (!isAtLeast6Chars.test(password)) {
      seterror("*at least 6 characters long");
      return;
    }

    seterror("")

    const profile = {
      displayName: name,
      photoURL: photo,
    };

    createUser(email, password)
      .then((res) => {
        profileInfo(profile);
        toast.success("Account Created!");
        navigate("/");
      })
      .catch((err) => {
        toast.error(`${err}`);
      });
  }

  function handleGoogle() {
    googleSignIn()
      .then((res) => {
        toast.success("Welcome back!");
        navigate("/");
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
          <div className=" xl:h-[42.5rem] md:h-[45rem]">
            <img
              className="z-40 object-cover w-full xl:h-[42.5rem] md:h-[45rem] rounded-tl-2xl rounded-bl-2xl"
              src="https://img.freepik.com/free-photo/side-view-fried-meat-with-french-fries-ketchup_141793-4908.jpg?t=st=1735155958~exp=1735159558~hmac=ac21c60014a4072f8e1d91e378ef64e152b728427161ad87a667522bccdc449b&w=900"
              alt=""
            />
          </div>
        </div>

        <div className="z-10 md:w-1/2 border border-black/20 md:rounded-tr-2xl md:rounded-br-2xl md:rounded-bl-none md:rounded-tl-none rounded-2xl px-10 py-8 bg-white">
          <div className="text-left mb-5">
            <h1 className="text-4xl font-bold">Create Your Account </h1>
            <p className="text-xs">Register below to get started.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-3">
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
            <div className="form-control mt-3">
              <label className="label">
                <span className="label-text">photo</span>
              </label>
              <input
                type="text"
                placeholder="photo"
                name="photo"
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
                placeholder="password"
                className="input input-bordered"
                name="password"
                required
              />
              <FaEye
                onClick={() => {
                  setisClicked(!isClicked);
                }}
                className="absolute right-5 top-[3.3rem]"
              ></FaEye>
            </div>
            <p className="text-sm mt-2 text-red-600">{error}</p>
            <div className="form-control mt-6">
              <button
                className="border border-black rounded-xl
              py-2.5 bg-[#E8252E] mb-3 border-none text-white font-medium hover:shadow-xl hover:scale-[1.01] duration-300"
              >
                Register
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
              <h1>Already have an account?</h1>
              <Link to="/login">
                <h1 className="font-bold text-[#E8252E] cursor-pointer">
                  login
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

export default Register;
