import React, { useContext } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../Context/AuthContextProvider";
import { DarkModeContext } from "../DarkModeProvider/DarkModeProvider";

const Detailes = () => {
  const foodData = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);

  function handlePurchase(_id) {
    if (user?.email === foodData?.useremail) {
      toast.error("You can not purchase!");
      return;
    }
    navigate(`/purchase/${_id}`);
  }

  return (
    <div className="px-16 pt-10 pb-20">
      <div className="food-details-container lg:w-[80%] w-[90%] mx-auto">
        <div className="flex items-center flex-col sm:flex-row">
          <img
            src={foodData.photo}
            alt={foodData.foodname}
            className="food-image w-66 h-44 object-cover rounded-xl"
          />
          <div className="sm:ml-5 mt-5 lg:mt-0 flex flex-col gap-1">
            <div className={`${isDarkMode ? "text-white" : "text-black"}`}>
              <h2 className="food-name text-4xl font-bold mt-0.5">
                {foodData.foodname}
              </h2>
              <p className="food-category text-md mt-0.5">
                Category: {foodData.category}
              </p>
              <p className="food-origin text- mt-0.5">
                Origin: {foodData.origin}
              </p>
            </div>
            <span className="price text-xl font-semibold text-[#FF2727]">
              Price: ${foodData.price}
            </span>
          </div>
        </div>
        <div className={`${isDarkMode ? "text-white" : "text-black"}`}>
          <p className="food-description mt-5">{foodData.description}</p>
          <div className="food-price mt-4 flex items-center justify-between">
            <span className="quantity text-md">
              Quantity: {foodData.quantity}
            </span>
          </div>
          <span className="quantity text-md">
            Purchase count: {foodData.purchase_count}
          </span>
          <div className="food-author mt-4 ">
            <p>Added by: {foodData.username}</p>
            <p>Email: {foodData.useremail}</p>
          </div>
          <h1 className="text-lg text-[#FF2727] font-semibold mt-3">
            {parseInt(foodData.quantity) == 0 &&
              "*You cannot buy this item as it is not available!"}
          </h1>

          {parseInt(foodData.quantity) == 0 ? (
            <button disabled className="btn btn-neutral w-full mt-5">
              Purchase
            </button>
          ) : (
            <button
              onClick={() => {
                handlePurchase(foodData._id);
              }}
              className={`btn ${
                isDarkMode
                  ? "bg-white text-black hover:text-white"
                  : "btn-neutral text-white"
              } w-full mt-5 hover:bg-[#FF2727]   border-none`}
            >
              Purchase
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detailes;
