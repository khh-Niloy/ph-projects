import React, { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";
import { DarkModeContext } from "../DarkModeProvider/DarkModeProvider";
import { Helmet } from "react-helmet";


const Update = () => {
  const data = useLoaderData();
  const { user, toastShow } = useContext(AuthContext);
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  // console.log(data)

  function handleSubmit(e) {
    e.preventDefault();

    const image = e.target.image.value;
    const itemName = e.target.itemName.value;
    const categoryName = e.target.categoryName.value;
    const description = e.target.description.value;
    const price = e.target.price.value;
    const rating = e.target.rating.value;
    const customization = e.target.customization.value;
    const processingTime = e.target.processingTime.value;
    const stockStatus = e.target.stockStatus.value;
    const userEmail = user.email;
    const userName = user.displayName;

    const updatedEquipement = {
      image,
      itemName,
      categoryName,
      description,
      price,
      rating,
      customization,
      processingTime,
      stockStatus,
      userEmail,
      userName,
    };

    fetch(`https://equi-sports-server-side.vercel.app/equipments/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEquipement),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        toastShow("success", "product updated!");
        navigate("/allsportsequipment");
      });
  }

  // console.log(data);
  return (
    <>
      <Helmet>
        <title>Update Product - EquiSports</title>
      </Helmet>

      <div>
        <div>
          <div className="hero pb-20">
            <div className="hero-content flex-col">
              <div className="flex items-center justify-center flex-col mb-8 mt-5">
                <h1 className="text-3xl font-bold">Update Equipment</h1>
              </div>
              <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
                <form onSubmit={handleSubmit} className="card-body text-black">
                  <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
                    <div className="form-control lg:col-span-3">
                      <label className="label">
                        <span className="label-text">Image</span>
                      </label>
                      <input
                        type="text"
                        name="image"
                        defaultValue={data.image}
                        placeholder="Image"
                        className="input input-bordered placeholder:text-sm"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Item Name</span>
                      </label>
                      <input
                        type="text"
                        name="itemName"
                        defaultValue={data.itemName}
                        placeholder="Item Name"
                        className="input input-bordered placeholder:text-sm"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Category Name</span>
                      </label>
                      <input
                        type="text"
                        defaultValue={data.categoryName}
                        name="categoryName"
                        placeholder="Category Name"
                        className="input input-bordered placeholder:text-sm"
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
                        defaultValue={data.price}
                        placeholder="Price"
                        className="input input-bordered placeholder:text-sm"
                        required
                      />
                    </div>
                    <div className="form-control lg:col-span-3">
                      <label className="label">
                        <span className="label-text">Description</span>
                      </label>
                      <textarea
                        name="description"
                        className="border border-black/15 rounded-xl resize-none p-3 focus:outline-black/5"
                        id=""
                        defaultValue={data.description}
                        cols="30"
                        rows="3"
                      ></textarea>
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Rating</span>
                      </label>
                      <input
                        type="number"
                        name="rating"
                        defaultValue={data.rating}
                        placeholder="Rating"
                        className="input input-bordered placeholder:text-sm"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">
                          Processing Time (in minutes)
                        </span>
                      </label>
                      <input
                        type="number"
                        name="processingTime"
                        defaultValue={data.processingTime}
                        placeholder="delivery time"
                        className="input input-bordered placeholder:text-sm"
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Stock Status</span>
                      </label>
                      <input
                        type="number"
                        defaultValue={data.stockStatus}
                        name="stockStatus"
                        placeholder="available product quantity"
                        className="input input-bordered placeholder:text-sm"
                        required
                      />
                    </div>
                    <div className="form-control lg:col-span-3">
                      <label className="label">
                        <span className="label-text">Customization</span>
                      </label>
                      <textarea
                        className="border border-black/15 rounded-xl resize-none p-3 focus:outline-black/5"
                        name="customization"
                        defaultValue={data.customization}
                        id=""
                        cols="30"
                        rows="3"
                      ></textarea>
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">User Email</span>
                      </label>
                      <input
                        type="email"
                        value={user?.email}
                        // name="userEmail"
                        placeholder="User Email"
                        className="input input-bordered"
                        required
                        readOnly
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">User Name</span>
                      </label>
                      <input
                        type="text"
                        value={user?.displayName}
                        // name="userName"
                        placeholder="User Name"
                        className="input input-bordered"
                        required
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="form-control mt-6">
                    <button
                      className={`btn ${
                        isDarkMode
                          ? "bg-gradient-to-t from-[#fc8f9a] to-[#F4BD6D] text-black/85"
                          : "bg-gradient-to-t from-[#007CF5] to-[#007bf5c9] text-white"
                      }`}
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Update;
