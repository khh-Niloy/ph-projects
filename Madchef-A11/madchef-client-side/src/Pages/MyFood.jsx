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
      <div className="w-[80%] mx-auto flex items-center mt-10 justify-center flex-col">
        <h1 className="text-3xl font-semibold">My Food Items</h1>
        <p className="text-sm text-center">
          Manage and review all the food items you've added to the menu.
        </p>
      </div>
      <div className="w-[80%] mx-auto pb-20 pt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {myfood.map((e) => (
          <div
            key={e._id}
            className={`relative card card-compact bg-base-100 shadow-xl ${
              isDarkMode && "text-black"
            }`}
          >
            <figure className="rounded-2xl shadow-xl h-[10rem]">
              <img
                className="object-cover w-full h-[10rem]"
                src={e.photo}
                alt="Shoes"
              />
              <Link to={`/updatefood/${e._id}`}>
                <TbEdit
                  className="bg-blue-600 border-[5px] hover:scale-[1.2] duration-300 border-white text-4xl cursor-pointer
                rounded-full p-1.5 text-white -top-2 -right-2 absolute"
                ></TbEdit>
              </Link>
            </figure>
            <div key={e._id} className="p-4">
              <h2 className="card-title">{e.foodname}</h2>
              <p className="text-sm my-1">Price: ${e.price}</p>
              <p className="text-sm my-1">Origin: {e.origin}</p>
              <p className="line-clamp-1 text-sm">{e.description}</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFood;
