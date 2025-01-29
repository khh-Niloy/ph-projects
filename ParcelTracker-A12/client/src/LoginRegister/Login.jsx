import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import safe from "../assets/gif1.json";
import Lottie from "lottie-react";
import { toast } from "../Hooks/use-toast";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useQueryClient } from "@tanstack/react-query";

const Login = () => {
  const { signInUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [eyeIconClicked, seteyeIconClicked] = useState(false);
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password).then(() => {
      form.reset();
      navigate("/");
      toast({
        title: <span style={{ color: "#00D26A" }}>Success!</span>,
        description: "Welcome back!",
        variant: "default",
        className: "bg-[black] text-white shadow-lg",
        duration: 3000,
      });
    });
  };

  async function handleGoogle() {
    try {
      const res = await googleSignIn();
      const userInfo = {
        name: res.user.displayName,
        image: res.user.photoURL,
        email: res.user.email,
        role: "user",
      };

      const response = await axiosPublic.post(`/all-user-info`, userInfo);

      if (response.status) {
        queryClient.invalidateQueries(["userrole", res?.user?.email]);
        navigate("/");

        toast({
          title: <span style={{ color: "#00D26A" }}>Success!</span>,
          description: "Account created successfully!",
          variant: "default",
          className: "bg-[black] text-white shadow-lg",
          duration: 3000,
        });
      }
    } catch (err) {
      toast({
        title: <span style={{ color: "#00D26A" }}>Sorry!</span>,
        description: `${err?.response?.data?.message}`,
        variant: "default",
        className: "bg-[black] text-white shadow-lg",
        style: {
          padding: "16px",
        },
        duration: 3000,
      });
    }
  }

  return (
    <div>
      <div className=" bg-gradient-to-b from-[#f3f6f900] to-[white] flex lg:flex-row flex-col-reverse items-center justify-center gap-20 relative">
        <div>
          <img
            src="https://i.ibb.co.com/wsWhKGr/c1.png"
            className="absolute top-20 rotate-180 translate-x-12 w-[6%]"
            alt=""
          />
          <img
            src="https://i.ibb.co.com/kHwTXnz/c4.png"
            className="absolute top-32 left-5 rotate-180 translate-x-12 w-[1.2%]"
            alt=""
          />
          <img
            src="https://i.ibb.co.com/jyM26px/c2.png"
            className="absolute top-12 right-40 -translate-x-16 w-[7%]"
            alt=""
          />
        </div>

        <div className="flex flex-col items-center w-[30%] lg:items-start">
          <div className="flex items-start lg:justify-start justify-center">
            <Lottie
              animationData={safe}
              loop={true} // Set to false if you don't want it to loop
              className="md:w-[80%] lg:w-[70%] sm:w-[50%]"
            />
          </div>
          <h1 className="text-lg mt-5 font-semibold">Benefits to Joining:</h1>
          <div className="flex items-center gap-4 text-sm mt-3 text-[black]/60">
            <ul>
              <div className="flex items-center gap-2">
                <BsCheckCircleFill className="text-[#e83434cb]"></BsCheckCircleFill>
                <li>Efficient Parcel Trackings</li>
              </div>
              <div className="flex items-center gap-2">
                <BsCheckCircleFill className="text-[#e83434cb] mt-3"></BsCheckCircleFill>
                <li className="mt-3">User-Friendly Dashboard</li>
              </div>
            </ul>
            <ul>
              <div className="flex items-center gap-2">
                <BsCheckCircleFill className="text-[#e83434cb]"></BsCheckCircleFill>
                <li>Real-Time Updates</li>
              </div>
              <div className="flex items-center gap-2">
                <BsCheckCircleFill className="text-[#e83434cb] mt-3"></BsCheckCircleFill>
                <li className="mt-3">Streamlined Delivery</li>
              </div>
            </ul>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center pt-12">
          <div className="pt-16 lg:pb-20 pb-10 flex-col">
            <div className="text-center lg:text-left"></div>
            <div className="rounded-md bg-base-100 w-full shrink-0 shadow-2xl">
              <form onSubmit={handleSubmit} className=" p-6 px-8">
                <h1 className="text-center text-lg font-semibold mb-5">
                  <span className="text-[#e83434] font-bold">Login</span> to
                  Your Account
                </h1>
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
                <div className="form-control mt-2 relative">
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
                    className={`absolute top-[3.1rem] right-4 ${
                      eyeIconClicked ? "text-black" : "text-black/40"
                    }`}
                  ></FaEye>
                  <label className="label">
                    <Link
                      onClick={() => setloginPageEmail(emailRef.current.value)}
                      to="/forget"
                      className="label-text-alt link link-hover font-semibold mt-2"
                    >
                      Forgot password?
                    </Link>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="bg-[#e83434] text-white py-2 rounded-sm text-sm shadow-md hover:scale-[1.03] active:scale-95 duration-300"
                  >
                    Login
                  </button>
                  <div
                    onClick={handleGoogle}
                    className="bg-white cursor-pointer border
                     border-[#e83434]/30 py-2 w-full rounded-sm mt-3 shadow-md hover:scale-[1.03] active:scale-95 duration-300 
                     flex gap-3 items-center justify-center"
                  >
                    <FcGoogle className="cursor-pointer text-2xl">
                      Google
                    </FcGoogle>
                    <h1 className="text-sm">Google</h1>
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm gap-2">
                  <h1>New user to FastPathao?</h1>
                  <h1
                    onClick={() => {
                      navigate("/register");
                    }}
                    className="font-bold text-[#e83434] cursor-pointer"
                  >
                    Register Now
                  </h1>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
