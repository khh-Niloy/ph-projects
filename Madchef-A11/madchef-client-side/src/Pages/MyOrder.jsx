import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContextProvider";
import { TiDelete } from "react-icons/ti";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../Custom/useAxiosSecure";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../DarkModeProvider/DarkModeProvider";
import { useMutation, useQuery } from "@tanstack/react-query";

const MyOrder = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);
  const [clickedID, setclickedID] = useState(null);

  const { data: myorder = [], refetch } = useQuery({
    queryKey: ["myorderList"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allorder/buyerfood/${user?.email}`);
      return res.data;
    },
  });

  const { mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: async (_id) => {
      const res = await axios.delete(
        `https://madchef-server-side.vercel.app/allorder/orderdelete/${_id}`
      );
      return res.data;
    },
    onSuccess: () => {
      refetch();
      // or, queryClient.invalidateQueries(['myorderList']);
      toast.error("Order deleted");
    },
  });

  async function handleDelete(_id) {
    await mutateAsync(_id);
  }

  return (
    <div>
      <div className="w-[80%] mx-auto text-center mt-10">
        <h1 className="text-2xl font-semibold">My Orders</h1>
        <p className="text-sm mt-1">
          Track Your Favorite Meals and Relive the Flavorful Moments
        </p>
      </div>

      <div
        className={`overflow-x-auto lg:w-[80%] w-[90%] mx-auto pb-20 ${
          myorder == 0 && "h-screen"
        } pt-10`}
      >
        <table className="table">
          <thead>
            <tr className={`${isDarkMode ? "text-white" : "text-black/60"}`}>
              <th></th>
              <th>Image</th>
              <th>Food Name</th>
              <th>Price</th>
              <th>Food Owner</th>
              <th>Buying time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myorder.map((e, index) => (
              <tr
                key={index}
                className={`${isDarkMode ? "hover:bg-[black]/20" : "hover"}`}
              >
                <th>{index + 1}</th>
                <td className="xl:w-[16%] lg:w-[20%] w-full h-20 p-0 md:p-3">
                  <img
                    className="rounded-xl p-0 w-full h-20 object-cover"
                    src={e.photo}
                    alt=""
                  />
                </td>
                <td>{e.foodname}</td>
                <td>${e.price}</td>
                <td>{e.useremail}</td>
                <td>{moment(e.buyingdate).format("MMMM Do YYYY, h:mm:ss")}</td>
                <td>
                  <button
                    key={index}
                    onClick={() => {
                      handleDelete(e._id);
                      setclickedID(e._id);
                    }}
                    className={`px-3 ${
                      isDarkMode
                        ? "hover:bg-gradient-to-t from-[#fd9da7] to-[#F4BD6D] hover:text-black/85 border border-[#F4BD6D] text-[#F4BD6D]"
                        : "bg-gradient-to-b from-[#ff3838] to-[#b52c2c] text-white"
                    } rounded-full py-1 font-semibold cursor-pointer text-[10px] active:scale-[0.1] transition-all hover:scale-[1.1] duration-300`}
                  >
                    {isPending ? (
                      clickedID === e._id ? (
                        <span className="loading loading-spinner loading-md"></span>
                      ) : (
                        "Delete"
                      )
                    ) : (
                      "Delete"
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrder;
