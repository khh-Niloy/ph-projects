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
      <div className="w-[80%] mx-auto pb-20 pt-10 grid lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 gap-5">
        {foods.data.map((e) => (
          <div
            key={e._id}
            className="card card-compact bg-base-100 rounded-2xl shadow-xl hover:scale-[1.03] duration-300 transition-transform"
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
                    More Info
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
