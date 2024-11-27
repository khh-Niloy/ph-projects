import React, { useContext, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";
import { Link as ScrollLink } from "react-scroll";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, signOutUser, toastShow } = useContext(AuthContext);
  const [isHover, setisHover] = useState(false);
  const location = useLocation();

  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-black font-semibold underline text-[16px] duration-300"
              : ""
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li
        className={`${
          location.pathname === "/" ? "flex" : "hidden"
        } duration-300`}
      >
        <ScrollLink
          to="about"
          smooth={true}
          duration={500}
          className="cursor-pointer"
        >
          About
        </ScrollLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-black font-semibold underline text-[16px] duration-300"
              : ""
          }
          to="/profile"
        >
          My Profile
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-black font-semibold underline text-[16px] duration-300"
              : ""
          }
          to="/resources"
        >
          Free Resources
        </NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar lg:w-[85%] w-[95%] lg:pt-8 pt-6 mx-auto bg-base-100 z-50">
        <div className="navbar-start z-50">
          <div className="dropdown z-50">
            <div tabIndex={0} role="button" className=" lg:hidden z-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 text-xs rounded-box z-[100] mt-5 w-52 p-2 shadow-xl"
            >
              {links}
            </ul>
          </div>
          <div className="flex items-center justify-center gap-1 ml-5 z-10">
            <img
              src="https://i.ibb.co.com/TWDy2kf/logo.png"
              className=""
              alt=""
            />
            <a onClick={() => navigate("/")} className="text-2xl font-bold">
              NextStep
            </a>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex ">
          <ul className="menu-horizontal px-1 gap-10">{links}</ul>
        </div>

        <div className="navbar-end z-50">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 flex-row-reverse">
              <img
                onMouseOver={() => setisHover(true)}
                onMouseOut={() => setisHover(false)}
                src={user?.photoURL}
                className={`${
                  user ? "flex" : "hidden"
                } w-9 h-9 rounded-full relative`}
                alt=""
              />
              <h1
                className={`absolute top-20 bg-base-200 p-2 rounded-xl text-xs 
                ${isHover ? "opacity-100" : "opacity-0"} duration-300`}
              >
                {user?.displayName}
              </h1>
            </div>
            <div className="cursor-pointer">
              <button
                onClick={() => {
                  {
                    if (user) {
                      signOutUser();
                      toastShow("error", "logged out");
                      navigate("/");
                    } else {
                      navigate("/login");
                    }
                  }
                }}
                className="px-5 bg-gradient-to-r from-[#007CF5] to-[#007bf5c9]
                rounded-full text-white py-1.5 text-sm font-semibold cursor-pointer whitespace-nowrap"
              >
                <h1 className="cursor-pointer">{user ? "logout" : "Login"}</h1>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
