import { Package, Star, UserRound } from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";

const DeliveryMenMenu = () => {
  return (
    <div className="space-y-3">
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-[#E83434] font-medium duration-100 transition"
              : "font-normal text-gray-700 hover:text-black hover:font-semibold duration-100 transition"
          }
          to={`/dashboard/mydelivery`}
        >
          <div className="flex items-center justify-start gap-3">
            <Package size={17} color="#e83434" /> My Delivery
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
          to={`/dashboard/myreview`}
        >
          <div className="flex items-center justify-start gap-3">
            <Star size={17} color="#e83434" /> My Review
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
    </div>
  );
};

export default DeliveryMenMenu;
