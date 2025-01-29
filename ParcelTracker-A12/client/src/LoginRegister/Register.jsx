import React, { useContext, useState } from "react";
import { imageUpload } from "../api/imagebb_api";
import { AuthContext } from "../Provider/AuthContextProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import safe from "../assets/gif2.json";
import Lottie from "lottie-react";
import { toast } from "../Hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Register = () => {
  const { createUser, updateUserProfile, googleSignIn } =
    useContext(AuthContext);
  const [eyeIconClicked, seteyeIconClicked] = useState(false);
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const [userType, setuserType] = useState("");

  function handleUserTypeSelect(value) {
    setuserType(value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const image = form.image.files[0];
    const usertype = userType;
    const phonenumber = form.phonenumber.value;
    const email = form.email.value;
    const password = form.password.value;
    //1. send image data to imgbb
    const photoURL = await imageUpload(image);

    const userInfo = {
      name: name,
      image: photoURL,
      email: email,
      phonenumber: phonenumber,
      role: usertype,
    };

    try {
      const response = await axiosPublic.post(`/all-user-info`, userInfo);
      console.log(response);
      const res = await createUser(email, password);
      console.log(res?.user?.email);
      queryClient.invalidateQueries(["userrole", res?.user?.email]);
      await updateUserProfile(name, photoURL);
      navigate("/");
      toast({
        title: <span style={{ color: "#00D26A" }}>Success!</span>,
        description: "Account created successfully!",
        variant: "default",
        className: "bg-[black] text-white shadow-lg",
        duration: 2000,
      });
    } catch (err) {
      // console.log(err.response.data.message);
      toast({
        title: <span style={{ color: "#00D26A" }}>Sorry!</span>,
        description: `${err?.response?.data?.message}`,
        variant: "default",
        className: "bg-[black] text-white shadow-lg",
        style: {
          padding: "16px",
        },
        duration: 2000,
      });
    }
  }

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
      console.log(response.status);
      if (response.status) {
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

        <div className="flex flex-col items-center lg:items-start w-[30%]">
          <div className="">
            <Lottie
              animationData={safe}
              loop={true} // Set to false if you don't want it to loop
              className="-translate-x-20"
            />
          </div>
          <h1 className="text-lg mt-5 font-semibold">Benefits to Joining:</h1>
          <div className="flex items-center gap-4 text-sm mt-3 text-[black]/60">
            <ul>
              <div className="flex items-center gap-2">
                <BsCheckCircleFill className="text-[#e83434cb]"></BsCheckCircleFill>
                <li>Track Parcel Status in Real-Time</li>
              </div>
              <div className="flex items-center gap-2">
                <BsCheckCircleFill className="text-[#e83434cb] mt-3"></BsCheckCircleFill>
                <li className="mt-3">Access Personalized Dashboard</li>
              </div>
            </ul>
            <ul>
              <div className="flex items-center gap-2">
                <BsCheckCircleFill className="text-[#e83434cb]"></BsCheckCircleFill>
                <li>Stay Updated with Notifications</li>
              </div>
              <div className="flex items-center gap-2">
                <BsCheckCircleFill className="text-[#e83434cb] mt-3"></BsCheckCircleFill>
                <li className="mt-3">Manage Your Deliveries Seamlessly</li>
              </div>
            </ul>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center pt-12 w-[30%]">
          <div className="pt-16 lg:pb-20 pb-10 flex-col">
            <div className="text-center lg:text-left"></div>
            <div className="rounded-md bg-base-100 w-full shrink-0 shadow-2xl">
              <form onSubmit={handleSubmit} className=" p-6 px-8">
                <h1 className="text-center text-lg font-semibold mb-5">
                  <span className="text-[#e83434] font-bold">Register</span> to
                  Your Account
                </h1>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="name"
                    className="border border-black/15 p-2 placeholder:text-xs py-2.5
                       rounded-md text-sm focus:outline-black/5"
                    name="name"
                    required
                  />
                </div>
                <div className="form-control mt-2">
                  <label className="label">
                    <span className="label-text font-semibold">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    name="email"
                    className="border border-black/15 p-2 placeholder:text-xs py-2.5
                       rounded-md text-sm focus:outline-black/5"
                    required
                  />
                </div>
                <div className="form-control mt-2">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Phone Number
                    </span>
                  </label>
                  <input
                    type="number"
                    placeholder="Phone Number"
                    name="phonenumber"
                    className="border border-black/15 p-2 placeholder:text-xs py-2.5
                       rounded-md text-sm focus:outline-black/5"
                    required
                  />
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="image"
                    className="block mb-2 text-sm font-semibold text-gray-700"
                  >
                    Select Your Image:
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="form-control mt-2">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Choose User Type
                    </span>
                  </label>
                  <Select onValueChange={handleUserTypeSelect}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="User type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="deliverymen">
                          Delivery Men
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
                </div>
                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="bg-[#e83434] text-white py-2 rounded-sm text-sm shadow-md hover:scale-[1.03] active:scale-95 duration-300"
                  >
                    Register
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
                  <h1>Already user to FastPathao?</h1>
                  <h1
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="font-bold text-[#e83434] cursor-pointer"
                  >
                    Login Now
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

export default Register;

{
  /* <div>
      <div className="hero bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                  name="name"
                  required
                />
              </div>
              <div>
                <label htmlFor="image" className="block mb-2 text-sm">
                  Select Image:
                </label>
                <input type="file" id="image" accept="image/*" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Choose User Type</span>
                </label>
                <select
                  name="usertype"
                  className="select select-bordered w-full max-w-xs"
                >
                  <option disabled selected>
                    User Type
                  </option>
                  <option value="user">User</option>
                  <option value="deliverymen">Delivery Men</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="number"
                  placeholder="Phone Number"
                  name="phonenumber"
                  className="input input-bordered"
                  required
                />
              </div>
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
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
            </form>
            <button onClick={handleGoogle} className="btn btn-neutral">
              Google
            </button>
          </div>
        </div>
      </div>
    </div> */
}
