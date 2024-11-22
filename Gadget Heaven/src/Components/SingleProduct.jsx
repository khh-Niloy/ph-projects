import React, { useContext, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import UserContext from "./context/UserContext";
import { BsCart3 } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import ReactStars from "react-rating-stars-component";
import { IoStarSharp } from "react-icons/io5";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SingleProduct() {
  const { productId } = useParams();
  const data = useLoaderData();

  const SingleProductData = data.find((e) => e.product_id === productId);

  const {
    addToCart,
    setaddToCart,
    addToWishlist,
    setaddToWishlist,
    money,
    setmoney,
  } = useContext(UserContext);

  const [rating, setRating] = useState(SingleProductData.rating);
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const [heartDisabled, setheartDisabled] = useState(false);

  return (
    <>
      <div className="text-center bg-[#9538E2] pt-8 pb-32">
        <h1 className="text-white font-semibold text-2xl">Product Details</h1>
        <p className="text-white text-xs font-light leading-[1.5] my-3">
          All You Need to Know About This Product
        </p>
      </div>

      <div className="flex flex-col items-center justify-center py-44 lg:pb-44 pb-[34rem] bg-[#f6f6f6] relative">
        <div className="absolute bg-white p-4 rounded-xl flex flex-col lg:flex-row -top-28 w-[80%] gap-5">
          <div className="lg:w-[36%]">
            <img
              src={SingleProductData.product_image}
              className="border border-black/10 rounded-xl object-cover w-full hover:scale-105 hover:transition"
              alt=""
            />
          </div>

          <div className="lg:w-[60%]">
            <h1 className="text-lg font-semibold">
              {SingleProductData.product_title}
            </h1>
            <p className="text-[#09080F]/90 my-1 text-sm font-semibold">
              Price: ${SingleProductData.price}
            </p>
            <span
              className="text-[#309C08] font-normal text-xs p-1 px-3 rounded-full border 
            border-[#309C08] bg-[#309C08]/10"
            >
              {SingleProductData.availability ? "In Stock" : "Out of Stock"}
            </span>
            <p className="text-[#09080F]/60 text-sm my-2">
              {SingleProductData.description}
            </p>
            <p className="text-[#09080F] font-semibold text-sm mb-2">
              Specification:
            </p>

            {SingleProductData.specification.map((e) => (
              <li className="list-decimal text-xs mb-1.5 text-black/60">{e}</li>
            ))}

            <div>
              <div className="flex items-center gap-1 text-sm mt-2">
                <h2 className="font-semibold">Rating</h2>
                <IoStarSharp className="mb-0.5 text-[#F9C004] text-[16px]"></IoStarSharp>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <ReactStars
                  count={5}
                  value={rating}
                  onChange={ratingChanged}
                  size={24}
                  isHalf={true}
                  activeColor="#F9C004"
                  color="#949494"
                  edit={false}
                />
                <p className="text-xs bg-[#09080F]/5 px-2 py-1 rounded-full text-[11px]">
                  {rating}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setaddToCart([...addToCart, SingleProductData]);
                  setmoney(SingleProductData.price + money);
                  toast.success("Added to cart", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                  });
                }}
                className="bg-[#9538E2] text-white text-xs font-medium px-4 py-2 rounded-full flex items-center"
              >
                Add to cart <BsCart3 className="ml-2"></BsCart3>
              </button>

              <button
                disabled={heartDisabled}
                onClick={() => {
                  const isExist = addToWishlist.find(
                    (e) => e.product_id === SingleProductData.product_id
                  );
                  setheartDisabled(true);
                  if (isExist) {
                    toast.warn("Alreay Added to wishlist!", {
                      position: "top-center",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                      transition: Bounce,
                    });
                  } else {
                    setaddToWishlist([...addToWishlist, SingleProductData]);
                    toast.success("Added to wishlist", {
                      position: "top-center",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                      transition: Bounce,
                    });
                  }
                }}
                className={` ${
                  heartDisabled
                    ? "bg-black/5 p-2 rounded-full text-black/20"
                    : "border border-black/35 p-2 rounded-full hover:bg-[#9538E2] hover:text-white duration-300"
                }`}
              >
                <FiHeart className="text-sm"></FiHeart>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
