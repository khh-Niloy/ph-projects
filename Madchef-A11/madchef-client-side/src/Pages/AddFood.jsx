import React, { useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContextProvider";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../DarkModeProvider/DarkModeProvider";
import useAxiosSecure from "../Custom/useAxiosSecure";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = () => {
    axiosSecure.get(
      `https://madchef-server-side.vercel.app/checkToken/${user?.email}`
    );
  };

  function handleSubmit(e) {
    e.preventDefault();

    const inititalData = new FormData(e.target);
    const formObjData = Object.fromEntries(inititalData.entries());
    formObjData.quantity = parseInt(formObjData.quantity);
    formObjData.purchase_count = 0;

    axios
      .post(`https://madchef-server-side.vercel.app/addfood`, formObjData)
      .then((res) => {
        e.target.reset();
        toast.success("New food item added successfully!");
        navigate("/myfood");
      });
  }

  return (
    <div>
      <div
        className={`hero duration-300 ${
          isDarkMode ? "bg-[#191A23]" : "bg-white"
        } pb-20 pt-5`}
      >
        <div className="hero-content flex-col w-full">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold mb-3">Add New Food</h1>
          </div>
          <div
            className={`card bg-base-100 w-[80%] shrink-0 duration-300 shadow-2xl ${
              isDarkMode && "text-black"
            }`}
          >
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Food Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Food Name"
                  name="foodname"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Food Image</span>
                </label>
                <input
                  type="url"
                  placeholder="Food Image"
                  className="input input-bordered"
                  name="photo"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Food Category</span>
                </label>
                <input
                  type="text"
                  name="category"
                  placeholder="Food Category"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Quantity</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  className="input input-bordered"
                  step="0.01"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Add By</span>
                </label>

                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  value={user?.displayName}
                  name="username"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                  readOnly
                />
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="useremail"
                  value={user?.email}
                  placeholder="Email"
                  className="input input-bordered"
                  required
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Food Origin</span>
                </label>
                <input
                  type="text"
                  name="origin"
                  placeholder="Add By"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  id=""
                  cols="30"
                  rows="5"
                  className="border border-black/15 rounded-md p-3 focus:outline-black/15"
                ></textarea>
              </div>
              <div className="form-control mt-6">
                <button className="btn hover:bg-blue-600 hover:border-none btn-neutral text-white w-full mt-2">
                  Add item
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
