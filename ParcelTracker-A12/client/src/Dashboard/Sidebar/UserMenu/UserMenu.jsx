import { NotebookText, Package, UserRound } from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="space-y-3">
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-[#E83434] font-medium duration-100 transition"
              : "font-normal text-gray-700 hover:text-black hover:font-semibold duration-100 transition"
          }
          to={`/dashboard/bookparcel`}
        >
          <div className="flex items-center justify-start gap-3">
            <NotebookText color="#e83434" size={17} /> Book A Parcel
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-[#E83434] font-medium duration-100 transition"
              : "font-normal text-gray-700 hover:text-black hover:font-semibold duration-100 transition"
          }
          to={`/dashboard/myparcel`}
        >
          <div className="flex items-center justify-start gap-3">
            <Package color="#e83434" size={17} /> My Parcel
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-[#E83434] font-medium duration-100 transition"
              : "font-normal text-gray-700 hover:text-black hover:font-semibold duration-100 transition"
          }
          to={`/dashboard/profile`}
        >
          <div className="flex items-center justify-start gap-3">
            <UserRound color="#e83434" size={17} /> My Profile
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-[#E83434] font-medium duration-100 transition"
              : "font-normal text-gray-700 hover:text-black hover:font-semibold duration-100 transition"
          }
          to={`/dashboard/message`}
        >
          <div className="flex items-center justify-start gap-3">
            <UserRound color="#e83434" size={17} /> Messenger
          </div>
        </NavLink>
      </li>
    </div>
  );
};

export default UserMenu;
