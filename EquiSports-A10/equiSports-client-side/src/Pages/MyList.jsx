import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";
import Swal from "sweetalert2";
import { DarkModeContext } from "../DarkModeProvider/DarkModeProvider";
import { Helmet } from "react-helmet";

const MyList = () => {
  const { user } = useContext(AuthContext);
  const [equipementData, setequipementData] = useState([]);
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    fetch(
      `https://equi-sports-server-side.vercel.app/equipments/userEmail/${user.email}`
    )
      .then((res) => res.json())
      .then((data) => setequipementData(data));
  }, [user?.email]);

  function handleDelete(_id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });

        fetch(`https://equi-sports-server-side.vercel.app/equipments/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            const remaining = equipementData.filter((e) => e._id !== _id);
            setequipementData(remaining);
          });
      }
    });
  }

  return (
    <>
      <Helmet>
        <title>My List - EquiSports</title>
      </Helmet>
      <div className="w-[85%] mx-auto">
        {/* {cardData.length} */}
        <h1 className="text-sm mt-5">
          Added by:{" "}
          <span className="font-semibold">
            {user.displayName} ({user.email})
          </span>
        </h1>

        <div className="flex items-center justify-center text-center flex-col mb-10">
          <h1 className="text-3xl font-bold lg:mt-0 mt-10">My List</h1>
        </div>

        <div className="overflow-x-auto pb-20">
          <table className="table">
            <thead>
              <tr
                className={`${
                  isDarkMode ? "text-[#FFC383] border-b border-[#FFC383]" : ""
                }`}
              >
                <th>Serial</th>
                <th>Item Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Stock Status</th>
                <th>Processing Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {equipementData.map((e, index) => (
                <tr
                  key={e._id}
                  className={`${
                    isDarkMode
                      ? "text-[#E4E4EB] hover:bg-[#FFC383]/10 border-t border-[#FFC383]/20"
                      : "text-black hover"
                  }`}
                >
                  <th>{index + 1}</th>
                  <td>{e.itemName}</td>
                  <td>{e.categoryName}</td>
                  <td>{e.price}$</td>
                  <td>{e.rating}/5</td>
                  <td>{e.stockStatus} available</td>
                  <td>{e.processingTime} days</td>
                  <td className="flex gap-3 items-center">
                    <Link to={`/update/${e._id}`}>
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
                    <button
                      onClick={() => {
                        handleDelete(e._id);
                      }}
                      className={`px-3 ${
                        isDarkMode
                          ? "hover:bg-gradient-to-t from-[#fd9da7] to-[#F4BD6D] hover:text-black/85 border border-[#F4BD6D] text-[#F4BD6D]"
                          : "bg-gradient-to-b from-[#ff3838] to-[#b52c2c] text-white"
                      } rounded-full py-1 font-semibold cursor-pointer text-[10px] active:scale-[0.1] transition-all hover:scale-[1.1] duration-300`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyList;
