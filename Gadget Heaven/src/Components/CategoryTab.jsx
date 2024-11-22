import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import UserContext from "./context/UserContext";

export default function CategoryTab() {
  const { categoryName } = useParams();
  const data = useLoaderData();
  const [products, setproducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filterCategory = [...data].filter((e) => e.category === categoryName);
    setproducts(filterCategory);

    if (categoryName === "all-product") {
      setproducts(data);
    } else if (categoryName === "tablets") {
      setproducts([]);
    } else if (filterCategory.length == 0) {
      setproducts(data.slice(0, 9));
    }
  }, [categoryName]);

  return (
    <div>
      <div
        className={`${
          products.length !== 0 ? "grid lg:grid-cols-3 gap-5" : ""
        }`}
      >
        {products.length !== 0 ? (
          products.map((e, index) => (
            <div key={index} className="card card-compact bg-base-100">
              <div className="w-full border-b lg:pb-3 pb-6 shadow-sm rounded-b-xl">
                <img
                  src={e.product_image}
                  alt="Shoes"
                  className=" h-[11rem] w-full object-cover rounded-2xl mt-3"
                />
              </div>
              <div className="card-body lg:items-start items-center mt-5 lg:mt-0">
                <h2 className="text-[15px] font-semibold lg:mt-3">
                  {e.product_title}
                </h2>
                <p className="text-[#09080F]/60">Price: {e.price}$</p>
                <div className="card-actions">
                  <Link to={`/p/${e.product_id}`}>
                    <button className="border-[1.35px] border-[#9538E2] lg:py-2 px-3 lg:px-3 py-1 
                    lg:text-xs text-[11px] rounded-full">
                      <span className="text-[#9538E2] font-semibold">
                        View Details
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="h-screen flex items-center justify-center flex-col">
            <div className="text-center mb-32">
              <h1 className="text-2xl font-semibold text-center">
                Sorry 😢, there are no products available <br /> in this
                category right now.
              </h1>
              <p className="mt-3">Try exploring our other products!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
