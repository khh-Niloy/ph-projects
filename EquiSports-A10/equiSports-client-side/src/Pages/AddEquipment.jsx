import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContextProvider";
import { DarkModeContext } from "../DarkModeProvider/DarkModeProvider";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const AddEquipment = () => {
  const { user, toastShow } = useContext(AuthContext);
  // console.log(user);
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

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
    const briefdescription = e.target.briefdescription.value;
    const userEmail = user.email;
    const userName = user.displayName;

    // console.log(image, itemName, categoryName, description, price, rating, customization, processingTime, stockStatus, userEmail, userName)

    const newEquipment = {
      image,
      itemName,
      categoryName,
      description,
      price,
      rating,
      customization,
      processingTime,
      stockStatus,
      briefdescription,
      userEmail,
      userName,
    };

    fetch("https://equi-sports-server-side.vercel.app/equipments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEquipment),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        toastShow("success", "Item successfully added");
        navigate("/mylist");
        e.target.reset();
      });
  }

  // image, itemName, categoryName, description, price, rating, customization, processingTime, stockStatus, userEmail, userName

  return (
    <>
      <Helmet>
        <title>Add Equipement - EquiSports</title>
      </Helmet>

      <div className="pb-20 pt-8 mx-auto">
        <div className="flex items-center justify-center flex-col mb-10">
          <h1 className="text-3xl font-bold">Add Equipment</h1>
          <p className="text-xs text-center">
            Expand your collection by adding the latest sports gear with ease.
          </p>
        </div>

        <div className="hero">
          <div className="hero-content flex-col sm:w-[90%]">
            <div className="card bg-base-100 w-full shrink-0 shadow-2xl">
              <form onSubmit={handleSubmit} className="card-body text-black">
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
                  <div className="form-control lg:col-span-3">
                    <label className="label">
                      <span className="label-text">
                        Image<span className="text-red-600 text-xs">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="image"
                      placeholder="Image"
                      className="input input-bordered placeholder:text-sm"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Item Name<span className="text-red-600 text-xs">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="itemName"
                      placeholder="Item Name"
                      className="input input-bordered placeholder:text-sm"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Category Name
                        <span className="text-red-600 text-xs">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="categoryName"
                      placeholder="Category Name"
                      className="input input-bordered placeholder:text-sm"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Price<span className="text-red-600 text-xs">*</span>
                      </span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      placeholder="Price"
                      className="input input-bordered placeholder:text-sm"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="form-control lg:col-span-3">
                    <label className="label">
                      <span className="label-text">
                        Short Description
                        <span className="text-red-600 text-xs">*</span>
                      </span>
                    </label>
                    <textarea
                      name="description"
                      className="border border-black/15 rounded-xl resize-none p-3 focus:outline-black/5"
                      id=""
                      cols="30"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Rating<span className="text-red-600 text-xs">*</span>
                      </span>
                    </label>
                    <input
                      type="number"
                      name="rating"
                      placeholder="Rating"
                      className="input input-bordered placeholder:text-sm"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Processing Time (days)
                        <span className="text-red-600 text-xs">*</span>
                      </span>
                    </label>
                    <input
                      type="number"
                      name="processingTime"
                      placeholder="delivery time"
                      className="input input-bordered placeholder:text-sm"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">
                        Stock Status
                        <span className="text-red-600 text-xs">*</span>
                      </span>
                    </label>
                    <input
                      type="number"
                      name="stockStatus"
                      placeholder="available product quantity"
                      className="input input-bordered placeholder:text-sm"
                      required
                    />
                  </div>
                  <div className="form-control lg:col-span-3">
                    <label className="label">
                      <span className="label-text">
                        Customization
                        <span className="text-red-600 text-xs">*</span>
                      </span>
                    </label>
                    <textarea
                      className="border border-black/15 rounded-xl resize-none p-3 focus:outline-black/5"
                      name="customization"
                      id=""
                      cols="30"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  <div className="form-control lg:col-span-3">
                    <label className="label">
                      <span className="label-text">
                        Brief Description
                        <span className="text-red-600 text-xs">*</span>
                      </span>
                    </label>
                    <textarea
                      name="briefdescription"
                      className="border border-black/15 rounded-xl resize-none p-3 focus:outline-black/5"
                      id=""
                      cols="30"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">User Email</span>
                    </label>
                    <input
                      type="email"
                      value={user.email}
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
                      value={user.displayName}
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
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEquipment;
