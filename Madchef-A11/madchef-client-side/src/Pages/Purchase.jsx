import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import useAxiosSecure from "../Custom/useAxiosSecure";
import { DarkModeContext } from "../DarkModeProvider/DarkModeProvider";
import { useForm } from "react-hook-form";

const Purchase = () => {
  const { user } = useContext(AuthContext);
  const [date, setdate] = useState(new Date(Date.now()));
  const navigate = useNavigate();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [data, setdata] = useState([]);
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    axiosSecure.get(
      `https://madchef-server-side.vercel.app/checkToken/${user?.email}`
    );
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const { register, handleSubmit, reset, setValue } = useForm();

  function fetchData() {
    axiosSecure.get(`/allfood/fooddetailes/purchase/${id}`).then((data) => {
      setdata(data.data);
      setValue("foodname", data.data.foodname);
      setValue("price", data.data.price);
    });
  }

  // console.log(data);

  const purchaseSubmit = async (formData) => {
    console.log(formData);

    if (formData.purchaseQuantity > parseInt(data.quantity)) {
      toast.error("Purchase failed! Quantity exceeds available stock.");
      return;
    }
    formData.foodid = data._id;
    const res = await axios.post(
      `https://madchef-server-side.vercel.app/addorder`,
      formData
    );
    console.log(res);
    reset();
    navigate("/allfood");
    toast.success("Order placed successfully!");
  };

  // function handleSubmit(e) {
  //   e.preventDefault();

  //   const purchaseQuantity = e.target.purchaseQuantity.value;
  //   if (parseInt(purchaseQuantity) > parseInt(data.quantity)) {
  //     toast.error("Purchase failed! Quantity exceeds available stock.");
  //     return;
  //   }

  //   const inititalData = new FormData(e.target);
  //   const formObjData = Object.fromEntries(inititalData.entries());
  //   formObjData.foodid = data._id;
  //   formObjData.purchaseQuantity = parseInt(formObjData.purchaseQuantity);

  //   console.log(formObjData)

  // axios
  //   .post(`https://madchef-server-side.vercel.app/addorder`, formObjData)
  //   .then((res) => {
  //     e.target.reset();
  //     navigate("/allfood");
  //     toast.success("Order placed successfully!");
  //   });
  // }

  return (
    <div>
      <div>
        <div
          className={`hero ${
            isDarkMode ? "bg-[#191A23]" : "bg-white"
          } pb-20 pt-5`}
        >
          <div className="hero-content flex-col w-full">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-bold">Food Purchase</h1>
            </div>
            <div
              className={`card bg-base-100 w-[80%] shrink-0 shadow-2xl ${
                isDarkMode && "text-black"
              }`}
            >
              <form
                onSubmit={handleSubmit(purchaseSubmit)}
                className="card-body"
              >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Food Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Food Name"
                    {...register("foodname")}
                    // value={data.foodname}
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Quantity ( {data.quantity} available)
                    </span>
                  </label>
                  <input
                    type="number"
                    {...register("purchaseQuantity", { valueAsNumber: true })}
                    // name="purchaseQuantity"
                    placeholder="Purchase Quantity"
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
                    {...register("price", { valueAsNumber: true })}
                    // name="price"
                    // defaultValue={data.price}
                    placeholder="Price"
                    className="input input-bordered"
                    step="0.01"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Buyer Name</span>
                  </label>
                  <input
                    type="text"
                    {...register("buyername")}
                    defaultValue={user?.displayName}
                    // name="buyername"
                    placeholder="Name"
                    className="input input-bordered"
                    required
                    readOnly
                  />
                  <label className="label">
                    <span className="label-text">Buyer Email</span>
                  </label>
                  <input
                    type="email"
                    {...register("buyeremail")}
                    // name="buyeremail"
                    defaultValue={user?.email}
                    placeholder="Email"
                    className="input input-bordered"
                    required
                    readOnly
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Buying Date</span>
                  </label>
                  <input
                    type="text"
                    {...register("buyingdate")}
                    // name="buyingdate"
                    value={date}
                    placeholder=""
                    className="input input-bordered"
                    required
                    readOnly
                  />
                </div>
                <div className="form-control mt-6">
                  <button className="btn hover:bg-blue-600 hover:border-none btn-neutral text-white w-full mt-2">
                    Purchase
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
