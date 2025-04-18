import {
  ChartColumnBig,
  Package,
  UserRound,
  Users,
  UsersRound,
} from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="space-y-3">
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-[#E83434] font-medium duration-100 transition"
              : "font-normal text-gray-700 hover:text-black hover:font-semibold duration-100 transition"
          }
          to={`/dashboard/alldeliverymen`}
        >
          <div className="flex items-center justify-start gap-3">
            <Users color="#e83434" size={17} /> All Delivery Men
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
          to={`/dashboard/allparcel`}
        >
          <div className="flex items-center justify-start gap-3">
            <Package size={17} color="#e83434" /> All Parcel
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
          to={`/dashboard/alluser`}
        >
          <div className="flex items-center justify-start gap-3">
            <UsersRound color="#e83434" size={17} /> All User
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-[#E83434] font-medium duration-300 transition"
              : "font-normal text-gray-700 hover:text-black hover:font-semibold duration-300 transition"
          }
          to={`/dashboard/statistics`}
        >
          <div className="flex items-center justify-start gap-3">
            <ChartColumnBig color="#e83434" size={17} /> Statistics
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-[#E83434] font-medium duration-300 transition"
              : "font-normal text-gray-700 hover:text-black hover:font-semibold duration-300 transition"
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
              ? "text-[#E83434] font-medium duration-300 transition"
              : "font-normal text-gray-700 hover:text-black hover:font-semibold duration-300 transition"
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

export default AdminMenu;
