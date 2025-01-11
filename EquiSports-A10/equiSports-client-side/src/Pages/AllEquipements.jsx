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

      <div className="w-[85%] mx-auto pb-20 pt-12">
        <div className="flex items-center justify-center text-center flex-col mb-3">
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
          } duration-300 py-1.5 mb-5 px-3 text-xs rounded-full active:scale-95 transition-all hover:scale-[1.15]`}
        >
          Sort: low to high price
        </button>

        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 mx-auto pb-20 pt-3 gap-5">
          {tableData.map((e) => (
            <div
              key={e._id}
              className={`hover:scale-[1.03] duration-300 card card-compact ${
                isDarkMode ? "bg-[#242532]" : "bg-base-100"
              } shadow-xl`}
            >
              <figure>
                <div className="w-full lg:h-[8.8rem] xl:h-[10.5] h-[10.5]">
                  <img
                    src={e.image}
                    alt="Shoes"
                    className="w-full object-cover"
                  />
                </div>
              </figure>
              <div
                className={`p-4 ${
                  isDarkMode ? "text-[#E4E4EB]" : "text-black"
                }`}
              >
                <h2 className="text-md font-semibold mb-1  leading-[1.4] line-clamp-3">
                  {e.itemName}
                </h2>
                <h2 className="text-sm font-normal leading-[1.4] line-clamp-3">
                  Category: {e.categoryName}
                </h2>
                <div className="flex items-start gap-4">
                  <h2 className="text-sm font-normal leading-[1.4] line-clamp-3">
                    Price: ${e.price}
                  </h2>
                  <h2 className="text-sm font-normal leading-[1.4] line-clamp-3">
                  Rating: {e.rating}/5
                  </h2>
                </div>
                <h2 className="text-sm font-normal leading-[1.4] line-clamp-3">
                  {e.stockStatus} available
                </h2>
                <h2 className="text-sm font-normal leading-[1.4] line-clamp-3">
                Processing Time: {e.processingTime} days
                </h2>
                <Link to={`/detailes/${e._id}`}>
                  <button
                    className={`${
                      isDarkMode
                        ? "bg-gradient-to-t from-[#fd9da7] to-[#F4BD6D] text-black/85"
                        : "bg-gradient-to-b from-[#3871FF] to-[#3036CC] text-white"
                    } 
                            rounded-lg w-full py-2 mt-3 font-normal cursor-pointer text-sm active:scale-95 transition-all`}
                  >
                    Detailes
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllEquipements;
