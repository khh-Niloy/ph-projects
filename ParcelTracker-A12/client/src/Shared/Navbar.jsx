import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthContextProvider";
import useRole from "../Hooks/useRole";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { Button } from "@/components/ui/button";
import { IoNotifications } from "react-icons/io5";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "../Hooks/use-toast";
import { ComponentContext } from "@/Provider/ComponentProvider";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const { role } = useRole();
  const axiosSecure = useAxiosPublic();
  const { toastMessage } = useContext(ComponentContext);

  const { data: loggedInUserInfo = [], refetch } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user-info/${user?.email}`);
      return data;
    },
  });
  refetch();

  const profileRoutes = (
    <div className="space-y-2 text-sm">
      <p>{user?.displayName}</p>
      <NavLink
        to={`${
          role === "user"
            ? "/dashboard/myparcel"
            : role === "admin"
            ? "/dashboard/statistics"
            : "/dashboard/mydelivery"
        }`}
        className="block hover:underline font-medium"
      >
        Dashboard
      </NavLink>
      <button
        onClick={() => {
          signOutUser();
          toastMessage(
            "Logged out",
            "You have been logged out.",
            "#825C0F",
            "#FBF2DE"
          );
        }}
        className="hover:font-semibold"
      >
        Logout
      </button>
    </div>
  );

  return (
    <div className="bg-white fixed z-50 w-full shadow">
      <div className="container mx-auto flex items-center justify-between py-2 xl:px-14 px-5 sm:px-7 md:px-10 lg:px-14">
        {/* Left Section: Logo */}
        <Link to={`/`} className="flex items-center gap-2">
          <img
            src="https://i.ibb.co.com/Yf5r1ZP/150897931-10529427.png"
            className="w-6 h-6"
            alt="Logo"
          />
          <span className="text-xl font-medium">FastPathao</span>
        </Link>

        {/* Middle Section: Home Navigation */}
        <nav className="flex justify-center">
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-black font-medium underline"
                    : "font-medium text-gray-700 hover:text-black"
                }
              >
                Home
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Right Section: Notifications and Profile */}
        <div className="flex items-center gap-6">
          {/* Notifications */}
          <div className="relative cursor-pointer">
            <IoNotifications className="text-lg text-gray-800" />
            <span className="absolute -top-1 -right-2 text-xs font-semibold text-red-500">
              0
            </span>
          </div>

          {/* Login Button */}
          {!user && (
            <Link to={`/login`}>
              <Button
                size="sm"
                className="text-xs bg-red-600 hover:bg-red-500 text-white rounded-md"
              >
                Login
              </Button>
            </Link>
          )}

          {/* Profile Dropdown */}
          {user && (
            <Popover>
              <PopoverTrigger asChild>
                <div
                  role="button"
                  className="cursor-pointer w-10 h-10 rounded-full overflow-hidden border border-gray-300"
                >
                  <img
                    alt="User Profile"
                    src={loggedInUserInfo?.image || "/default-avatar.png"}
                    className="w-full h-full object-cover"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-48 -translate-x-2 p-4 bg-white shadow-md rounded-md">
                {profileRoutes}
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
