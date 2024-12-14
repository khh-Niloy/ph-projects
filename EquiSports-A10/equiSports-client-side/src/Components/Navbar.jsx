import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { DarkModeContext } from "../DarkModeProvider/DarkModeProvider";
import { IoMoon } from "react-icons/io5";
import { PiSunFill } from "react-icons/pi";
import logo from "../assets/logo.svg";

const Navbar = () => {
  const { user, signOutUser, toastShow } = useContext(AuthContext);
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const links = (
    <>
      <li className={`${isDarkMode ? "z-50 relative" : ""}`}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `${
                  isDarkMode ? "text-white" : "text-blue-600"
                } font-semibold underline text-sm duration-300`
              : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li className={`${isDarkMode ? "z-50 relative" : ""}`}>
        <NavLink
          to="/allsportsequipment"
          className={({ isActive }) =>
            isActive
              ? `${
                  isDarkMode ? "text-white" : "text-blue-600"
                } font-semibold underline text-sm duration-300`
              : ""
          }
        >
          All Sports Equipment
        </NavLink>
      </li>
      <li className={`${isDarkMode ? "z-50 relative" : ""}`}>
        <NavLink
          to="/addequipment"
          className={({ isActive }) =>
            isActive
              ? `${
                  isDarkMode ? "text-white" : "text-blue-600"
                } font-semibold underline text-sm duration-300`
              : ""
          }
        >
          Add Equipment
        </NavLink>
      </li>
      <li className={`${isDarkMode ? "z-50 relative" : ""}`}>
        <NavLink
          to="/mylist"
          className={({ isActive }) =>
            isActive
              ? `${
                  isDarkMode ? "text-white" : "text-blue-600"
                } font-semibold underline text-sm duration-300 z-50 relative`
              : ""
          }
        >
          My Equipment List
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="">
      <div
        className={`navbar ${
          isDarkMode ? "bg-[#191A23]" : "bg-base-100"
        } xl:w-[85%] lg:w-[90%] mx-auto pt-6 pb-4 w-[95%]`}
      >
        <div className="navbar-start ">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="lg:hidden mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 relative z-50"
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
              className={`menu menu-sm dropdown-content ${
                isDarkMode
                  ? "bg-[#242532] border border-[#ffca80]/50"
                  : "bg-base-100 border border-[#047EF6]/80"
              } rounded-box z-50 mt-3 w-52 p-2 shadow`}
            >
              {links}
            </ul>
          </div>
          <div className="text-xl font-bold z-20 relative flex items-center">
            <img src={logo} className="w-[20%]" alt="" />
            <h1>EquiSports</h1>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu-horizontal px-1 gap-8 text-sm z-50 relative">
            {links}
          </ul>
        </div>

        <div className="navbar-end z-50 relative flex-row-reverse justify-start gap-2">
          <button
            onClick={() => {
              if (user) {
                signOutUser();
                toastShow("warning", "logged out");
              } else {
                navigate("/login");
              }
            }}
            className={`px-5 ${
              isDarkMode
                ? "bg-gradient-to-t from-[#fc8f9a] to-[#F4BD6D] text-black/85"
                : "bg-gradient-to-r from-[#007CF5] to-[#007bf5c9] text-white"
            }
                rounded-full py-1.5 text-sm font-semibold cursor-pointer`}
          >
            {user ? "logout" : "login"}
          </button>

          {!user && (
            <>
              <Link to="/register">
                <button
                  className={`px-5 ${
                    isDarkMode
                      ? "bg-gradient-to-t from-[#fc8f9a] to-[#F4BD6D] text-black/85"
                      : "bg-gradient-to-r from-[#007CF5] to-[#007bf5c9] text-white"
                  }
                      rounded-full py-1.5 text-sm font-semibold cursor-pointer`}
                >
                  Register
                </button>
              </Link>
            </>
          )}

          <img
            data-tooltip-id="my-tooltip"
            data-tooltip-content={`${user?.displayName}`}
            className={`w-8 h-8 rounded-full z-50 ${user ? "flex" : "hidden"}`}
            src={user?.photoURL}
            alt=""
          />

          <button onClick={toggleDarkMode} className="text-xl mr-3">
            {isDarkMode ? <PiSunFill></PiSunFill> : <IoMoon></IoMoon>}
          </button>
        </div>
      </div>
      <Tooltip id="my-tooltip" className="z-50" />
    </div>
  );
};

export default Navbar;
