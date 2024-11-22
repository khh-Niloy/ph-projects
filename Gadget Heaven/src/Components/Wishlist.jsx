import React, { useContext } from "react";
import UserContext from "./context/UserContext";
import { RxCross2 } from "react-icons/rx";
import { BsCart3 } from "react-icons/bs";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Wishlist() {
  const { addToWishlist, setaddToWishlist, addToCart, setaddToCart, money, setmoney } =
    useContext(UserContext);

  return (
    <>
      <div className="bg-[#f6f6f6] border">
        <div className="lg:w-[80%] w-[90%] mx-auto mt-10 ">
          <h1 className="font-bold text-xl">WishList</h1>
          <div className="grid grid-cols-1 gap-5 mt-8 pb-32">
            {addToWishlist.map((e) => (
              <div className="flex items-center justify-start gap-12 lg:py-2 py-5 rounded-2xl bg-white">
                <div className="lg:w-[17%] w-[45%]">
                  <img
                    src={e.product_image}
                    className="w-full rounded-2xl ml-5"
                    alt=""
                  />
                </div>
  
                <div className="flex justify-between w-full">
                  <div className="flex flex-col gap-1.5">
                    <h1 className="text-md font-semibold">{e.product_title}</h1>
                    <p className="text-[#09080F]/60 lg:text-sm text-xs">
                      {e.description}
                    </p>
                    <h1 className="lg:text-sm font-semibold text-xs">Price: ${e.price}</h1>
                    <div>
                      <button
                        onClick={() => {
                          setaddToCart([...addToCart, e]);
                          setmoney(e.price + money)
                          toast.success("Added to cart!", {
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
                        className="bg-[#9538E2] text-white text-xs font-medium px-4 py-2 rounded-full"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      const remaining = addToWishlist.filter(
                        (list) => list.product_id !== e.product_id
                      );
                      setaddToWishlist(remaining);
                    }}
                  >
                    <RxCross2
                      className="lg:mr-10 mr-4 border border-[red] text-[red] text-2xl p-1 rounded-full
                     hover:bg-red-600 hover:text-white hover:border-none cursor-pointer"
                    ></RxCross2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
