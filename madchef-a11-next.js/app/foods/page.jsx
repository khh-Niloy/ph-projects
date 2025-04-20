import { Button } from "@/components/ui/button";
import getAllFood from "@/lib/getAllFood";
import Link from "next/link";
import React from "react";

const AllFood = async () => {
  const foods = await getAllFood();
  const isDarkMode = false;

  // function handleSort(){

  return (
    <div>
      {/* <PageTitle
        image="https://img.freepik.com/free-photo/banner-delicious-tacos_23-2150831065.jpg?t=st=1735131997~exp=1735135597~hmac=0166f35354e53b1fd3c54b53cb8d567bfd16d6edce8ac5330978f877aa4e3711&w=1380"
        text="All Food"
        subtext="Explore Our All-Time Favorite Dishes Handpicked to Satisfy Your Cravings"
      ></PageTitle> */}

      <div
        className={`lg:w-[40%] md:w-[55%] sm:w-[60%] w-[80%] mx-auto mt-8 py-3 ${
          isDarkMode && "text-black"
        }`}
      >
        <label className="input input-bordered flex items-center gap-2">
          {/* <input
            type="text"
            onChange={(e) => {
              setsearchText(e.target.value);
            }}
            className="grow"
            placeholder="Search"
          /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      <div className="w-[80%] mx-auto mt-10 text-black">
        {/* <select
          onChange={(e) => handleSort(e.target.value)}
          className="duration-300 select select-bordered w-full max-w-xs"
        >
          <option disabled selected>
            Sort by
          </option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select> */}
      </div>

      <div className="w-[80%] mx-auto pb-20 pt-10 grid lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 gap-5">
        {foods.data.map((e) => (
          <div
            key={e._id}
            className="card card-compact bg-base-100 shadow-xl hover:scale-[1.03] duration-300 transition-transform"
          >
            <figure className="h-[10rem] drop-shadow-xl rounded-2xl relative">
              <p
                className="text-[9px] left-3
              bottom-3 drop-shadow-xl absolute bg-[#FF2727] text-white px-3 py-1 rounded-lg font-medium"
              >
                Price: ${e.price}
              </p>
              <img
                className="object-cover h-[10rem] w-full"
                src={e.photo}
                alt="Shoes"
              />
            </figure>
            <div key={e._id} className={`p-4 ${isDarkMode && "text-black"}`}>
              <h2 className="card-title">{e.foodname}</h2>
              <p className="text-sm">Origin: {e.origin}</p>
              <p className="line-clamp-2 text-sm mt-1">{e.description}</p>
              <div className="card-actions justify-end">
                <Link href={`/foods/${e._id}`} className="w-full">
                  <Button
                    className="hover:bg-[#FF2727] bg-[#191A23] text-white
                    rounded-lg w-full py-2 mt-3 font-normal cursor-pointer text-sm active:scale-95 transition-all"
                  >
                    See More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFood;
