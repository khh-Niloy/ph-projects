import React, { useContext, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContextProvider";
import { DarkModeContext } from "../DarkModeProvider/DarkModeProvider";
import { Helmet } from "react-helmet";

const AllEquipements = () => {
  const data = useLoaderData();
  const { user } = useContext(AuthContext);
  const [tableData, settableData] = useState(data);
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);

  function handleSort() {
    const sortedData = [...tableData].sort(function (a, b) {
      return a.price - b.price;
    });
    settableData(sortedData);
  }

  return (
    <>
      <Helmet>
        <title>All Equipements - EquiSports</title>
      </Helmet>

      <div className="w-[85%] mx-auto pb-20 pt-8">
        <div className="flex items-center justify-center text-center flex-col mb-10">
          <h1 className="text-3xl font-bold">Explore All Equipment</h1>
          <p className="text-xs mt-2">
            Browse through our collection with all the details you need at a
            glance.
          </p>
        </div>

        <button
          onClick={handleSort}
          className={`${
            isDarkMode
              ? "bg-gradient-to-t from-[#fd9da7] to-[#F4BD6D] text-black/85"
              : "bg-gradient-to-b from-[#3871FF] to-[#3036CC] text-white"
          } duration-300 py-1.5 mb-5 px-3 text-xs rounded-full`}
        >
          Sort: low to high price
        </button>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
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
              {tableData.map((e, index) => (
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
                  <td className="">
                    <Link to={`/detailes/${e._id}`}>
                      <button
                        className={`px-3 ${
                          isDarkMode
                            ? "hover:bg-gradient-to-t from-[#fd9da7] to-[#F4BD6D] hover:text-black/85 border border-[#F4BD6D] text-[#F4BD6D]"
                            : "bg-gradient-to-b from-[#3871FF] to-[#3036CC] text-white"
                        } rounded-full py-1 font-semibold cursor-pointer text-[10px]`}
                      >
                        View Detailes
                      </button>
                    </Link>
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

export default AllEquipements;
