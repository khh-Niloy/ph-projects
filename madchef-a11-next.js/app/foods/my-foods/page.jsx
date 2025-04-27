"use client";

import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContextProvider";
import axios from "axios";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

import ModalBtn from "@/components/modalButton/ModalBtn";

const MyFood = () => {
  const { user } = useContext(AuthContext);
  const [myFood, setmyFood] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`/api/foods/my-foods/${user?.email}`);
      const data = await res.data;
      console.log(data);
      setmyFood(data);
    }
    fetchData();
  }, [user?.email]);

  // console.log(myFood);

  const isDarkMode = false;

  const [isClicked, setIsClicked] = useState(false);

  return (
    <div>
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
          className={`overflow-x-auto lg:w-[85%] w-[90%] mx-auto pb-20 ${
            myFood == 0 && "h-screen"
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
                <th>Added On</th>
                <th>Update On</th>
                <th>Total Purchases</th>
                <th>Total Revenue</th>
                <th>Actions: Update & Delete</th>
              </tr>
            </thead>
            <tbody>
              {myFood.map(
                (
                  {
                    photo,
                    foodname,
                    price,
                    addedDate,
                    updateDate,
                    totalPurchase,
                    _id,
                  },
                  index
                ) => (
                  <tr
                    className={`${
                      isDarkMode ? "hover:bg-[black]/20" : "hover"
                    }`}
                  >
                    <th>{index + 1}</th>
                    <td className="xl:w-[16%] lg:w-[20%] w-full p-0 md:p-3">
                      <img
                        className="rounded-xl p-0 w-full"
                        src={photo}
                        alt=""
                      />
                    </td>
                    <td>{foodname}</td>
                    <td>${price}</td>
                    <td>{new Date(addedDate).toLocaleDateString()}</td>
                    <td className="text-center">{updateDate || "-"}</td>
                    <td className="text-center">{totalPurchase}</td>
                    <td className="text-center">${totalPurchase * price}</td>
                    <td className="space-x-3">
                      <Button
                        onClick={() => {
                          document.getElementById("my_modal_1").showModal();
                          setIsClicked(!isClicked);
                        }}
                        variant="outline"
                        size="md"
                        className="hover:bg-gradient-to-b from-[#3871FF]
                           to-[#3036CC] text-white hover:duration-300 bg-[#212121] px-3 py-2 text-xs"
                      >
                        Update
                      </Button>
                      <ModalBtn
                        setIsClicked={setIsClicked}
                        isClicked={isClicked}
                        foodId={_id}
                        modalId={"my_modal_1"}
                      ></ModalBtn>
                      <Link href={`/updatefood/${_id}`}>
                        <Button
                          variant="outline"
                          size="md"
                          className="hover:bg-gradient-to-b from-[#E8252E]
                           to-[#eb3e46] text-white duration-500 bg-[#212121] px-3 py-2 text-xs"
                        >
                          Delete
                        </Button>
                      </Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyFood;
