import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContextProvider";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import useAxiosSecure from "../Custom/useAxiosSecure";
import { DarkModeContext } from "../DarkModeProvider/DarkModeProvider";

const MyFood = () => {
  const { user } = useContext(AuthContext);
  const [myfood, setmyfood] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = () => {
    axiosSecure.get(`/allfood/adminfood/${user?.email}`).then((data) => {
      setmyfood(data.data);
    });
  };

  return (
    <div>
      <div
        className={`w-[80%] mx-auto flex items-center mt-10 justify-center flex-col`}
      >
        <h1 className="text-2xl font-semibold">My Food Items</h1>
        <p className="text-sm text-center">
          Manage and review all the food items you've added to the menu.
        </p>
      </div>

      <div
        className={`overflow-x-auto lg:w-[80%] w-[90%] mx-auto pb-20 ${
          myfood == 0 && "h-screen"
        } pt-10`}
      >
        <table className="table">
          {/* head */}
          <thead>
            <tr className={`${isDarkMode ? "text-white" : "text-black/60"}`}>
              <th></th>
              <th>Image</th>
              <th>Food Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Purchase count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myfood.map((e, index) => (
              <tr className={`${isDarkMode ? "hover:bg-[black]/20" : "hover"}`}>
                <th>{index + 1}</th>
                <td className="xl:w-[16%] lg:w-[20%] w-full p-0 md:p-3">
                  <img className="rounded-xl p-0 w-full" src={e.photo} alt="" />
                </td>
                <td>{e.foodname}</td>
                <td>${e.price}</td>
                <td>{e.quantity}</td>
                <td>{e.purchase_count}</td>
                <td>
                  <Link to={`/updatefood/${e._id}`}>
                    <button
                      className={`px-3 ${
                        isDarkMode
                          ? "hover:bg-gradient-to-t from-[#fd9da7] to-[#F4BD6D] hover:text-black/85 border border-[#F4BD6D] text-[#F4BD6D]"
                          : "bg-gradient-to-b from-[#3871FF] to-[#3036CC] text-white"
                      } rounded-full py-1 font-semibold cursor-pointer text-[10px] active:scale-[0.1] transition-all hover:scale-[1.1] duration-300`}
                    >
                      Update
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFood;
