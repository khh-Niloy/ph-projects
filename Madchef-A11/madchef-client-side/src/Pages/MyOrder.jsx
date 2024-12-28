import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContextProvider";
import { TiDelete } from "react-icons/ti";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../Custom/useAxiosSecure";
import { RxCross2 } from "react-icons/rx";
import { DarkModeContext } from "../DarkModeProvider/DarkModeProvider";

const MyOrder = () => {
  const { user } = useContext(AuthContext);
  const [myorder, setmyorder] = useState([]);
  const axiosSecure = useAxiosSecure();
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    fetchData();
  }, [user]);

  async function fetchData() {
    axiosSecure.get(`/allorder/buyerfood/${user?.email}`).then((data) => {
      setmyorder(data.data);
    });
  }

  function handleDelete(_id) {
    axios
      .delete(
        `https://madchef-server-side.vercel.app/allorder/orderdelete/${_id}`
      )
      .then((res) => {
        toast.error("Order deleted");
        fetchData();
      });
  }

  return (
    <div>
      <div className="w-[80%] mx-auto text-center mt-10">
        <h1 className="text-3xl font-semibold">My Orders</h1>
        <p className="text-sm mt-1">
          Track Your Favorite Meals and Relive the Flavorful Moments
        </p>
      </div>

      <div className="w-[80%] mx-auto pb-20 pt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {myorder.map((e) => (
          <div
            key={e._id}
            className={`relative card card-compact bg-base-100 shadow-xl ${
              isDarkMode && "text-black"
            }`}
          >
            <figure className="rounded-2xl shadow-xl h-[10rem]">
              <img
                src={e.photo}
                className="object-cover w-full h-[10rem]"
                alt="Shoes"
              />
              <RxCross2
                onClick={() => {
                  handleDelete(e._id);
                }}
                className="bg-[#E8252E] border-[5px] hover:scale-[1.2] duration-300 border-white text-4xl cursor-pointer
                rounded-full p-1.5 text-white -top-2 -right-2 absolute"
              ></RxCross2>
            </figure>
            <div key={e._id} className="p-4">
              <h2 className="card-title">{e.foodname}</h2>
              <p className="text-sm">
                <span className="font-semibold">Price:</span> ${e.price}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Food Owner:</span> {e.useremail}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Buying time:</span>{" "}
                {moment(e.buyingdate).format("MMMM Do YYYY, h:mm:ss")}
              </p>
              <p className="line-clamp-1">{e.description}</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrder;
