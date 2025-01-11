import React, { useContext } from "react";
import { Link, NavLink, useNavigation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";
import toast, { Toaster } from "react-hot-toast";
import { DarkModeContext } from "../DarkModeProvider/DarkModeProvider";
import { IoMoon } from "react-icons/io5";
import { PiSunFill } from "react-icons/pi";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);

  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-white font-semibold underline text-sm duration-300"
              : "text-white font-light duration-300"
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? ` font-semibold underline text-sm duration-300 ml-9 text-white`
              : ` font-light duration-300 ml-9 text-white text-sm`
          }
          to="/allfood"
        >
          All Foods
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-white font-semibold underline text-sm duration-300 ml-9"
              : "text-white font-light duration-300 ml-9 text-sm"
          }
          to="/gallery"
        >
          Gallery
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold underline text-sm duration-300 ml-9"
                  : "text-white font-light duration-300 ml-9 text-sm"
              }
              to="/myfood"
            >
              My Foods
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold underline text-sm duration-300 ml-9"
                  : "text-white font-light duration-300 ml-9 text-sm"
              }
              to="/addfood"
            >
              Add Food
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold underline text-sm duration-300 ml-9"
                  : "text-white font-light duration-300 ml-9 text-sm"
              }
              to="/myorder"
            >
              My Orders
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  const menubarLinks = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-black font-semibold underline text-sm duration-300"
              : "text-black font-light duration-300"
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-black font-semibold underline text-sm duration-300"
              : "text-black font-light duration-300"
          }
          to="/allfood"
        >
          All Foods
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-black font-semibold underline text-sm duration-300"
              : "text-black font-light duration-300 text-sm"
          }
          to="/gallery"
        >
          Gallery
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-black font-semibold underline text-sm duration-300"
                  : "text-black font-light duration-300"
              }
              to="/myfood"
            >
              My Foods
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-black font-semibold underline text-sm duration-300"
                  : "text-black font-light duration-300"
              }
              to="/addfood"
            >
              Add Food
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "text-black font-semibold underline text-sm duration-300"
                  : "text-black font-light duration-300"
              }
              to="/myorder"
            >
              My Orders
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  /* const menubarLinks = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-black font-semibold underline text-md duration-300"
              : "text-black font-light duration-300"
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-black font-semibold underline text-md duration-300"
              : "text-black font-light duration-300"
          }
          to="/allfood"
        >
          All Foods
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-black font-semibold underline text-md duration-300"
              : "text-black font-light duration-300"
          }
          to="/gallery"
        >
          Gallery
        </NavLink>
      </li>
    </>
  ); */

  const profileLinks = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-black font-semibold underline text-md duration-300"
              : "text-black font-light duration-300"
          }
          to="/myfood"
        >
          My Foods
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-black font-semibold underline text-md duration-300"
              : "text-black font-light duration-300"
          }
          to="/addfood"
        >
          Add Food
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-black font-semibold underline text-md duration-300"
              : "text-black font-light duration-300"
          }
          to="/myorder"
        >
          My Orders
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      <div className="fixed z-50 w-full">
        <div
          className={`navbar ${
            isDarkMode
              ? "bg-[#191a23] duration-300"
              : "bg-[#E8252E] duration-300"
          }`}
        >
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="ml-2 lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 md:h-6 md:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
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
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
              >
                {menubarLinks}
              </ul>
            </div>
            <img
              className="lg:w-[12%] md:w-[12%] sm:w-[13%] w-[17%] ml-5 xl:w-[9%]"
              src="/logowhite.svg"
              alt=""
            />
            <Link to="/">
              <p className="ml-2 font-semibold text-xl text-white">Madchef</p>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu-horizontal px-1">{links}</ul>
          </div>
          <div className="navbar-end lg:mr-5 mr-1">
            <button onClick={toggleDarkMode} className="text-xl mr-3">
              {isDarkMode ? (
                <PiSunFill className="text-white"></PiSunFill>
              ) : (
                <IoMoon className="text-white"></IoMoon>
              )}
            </button>
            {user ? (
              <>
                <button
                  className={`text-sm text-[#E8252E] rounded-full font-semibold mr-2 ${
                    isDarkMode ? "bg-[#E8252E] text-white" : "bg-white"
                  } px-3 py-1 hover:scale-[1.05] duration-300`}
                  onClick={() => {
                    signOutUser();
                    toast.success("Logout");
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="login"
                  className="text-sm text-[#E8252E] rounded-full font-semibold mr-1.5 bg-white px-3 py-1"
                >
                  Login
                </Link>
              </>
            )}

            {user && (
              <>
                <div title={user.email} className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={user?.photoURL}
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                  >
                    {profileLinks}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
