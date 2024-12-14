import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";
import Swal from "sweetalert2";
import { DarkModeContext } from "../DarkModeProvider/DarkModeProvider";
import { Helmet } from "react-helmet";

const MyList = () => {
  // const data = useLoaderData();
  const { user } = useContext(AuthContext);
  const [equipementData, setequipementData] = useState([]);
  // const loggedInUserItems = data.filter((e) => e.userEmail === user?.email);
  // const [cardData, setcardData] = useState(equipementData);
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);
  // console.log(user);

  useEffect(() => {
    fetch(
      `https://equi-sports-server-side.vercel.app/equipments/userEmail/${user.email}`
    )
      .then((res) => res.json())
      .then((data) => setequipementData(data));
  }, [user?.email]);

  function handleDelete(_id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });

        fetch(`https://equi-sports-server-side.vercel.app/equipments/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            const remaining = equipementData.filter((e) => e._id !== _id);
            setequipementData(remaining);
          });
      }
    });
  }

  return (
    <>
      <Helmet>
        <title>My List - EquiSports</title>
      </Helmet>
      <div className="w-[85%] mx-auto">
        {/* {cardData.length} */}
        <h1 className="text-sm mt-5">
          Added by:{" "}
          <span className="font-semibold">
            {user.displayName} ({user.email})
          </span>
        </h1>

        <div>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 pt-8 pb-16 relative">
            {equipementData.map((e) => (
              <div
                key={e._id}
                className={`card card-compact ${
                  isDarkMode ? "bg-[#242532]" : "bg-base-100"
                } shadow-sm border border-black/10 hover:shadow-xl hover:border-none duration-300`}
              >
                <figure>
                  <img
                    src={e.image}
                    className="h-[7rem] object-cover mt-4 rounded-xl"
                    alt="Shoes"
                  />
                </figure>
                <div
                  className={`p-4 ${
                    isDarkMode ? "text-[#E4E4EB]" : "text-black"
                  }`}
                >
                  <h2 className="text-sm">{e.itemName}</h2>
                  <div className="flex gap-2">
                    <h2 className="text-xs">Price: {e.price}$</h2>
                    <h2 className="text-xs">Rating: {e.rating}/5</h2>
                    <h2 className="text-xs">
                      Stock status: {e.stockStatus} ...
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 mt-3 gap-2 w-full">
                    <button
                      onClick={() => {
                        handleDelete(e._id);
                      }}
                      className="btn bg-[#fe2f2f] text-white"
                    >
                      Delete
                    </button>
                    <Link to={`/update/${e._id}`}>
                      <button className="btn w-full btn-primary text-white">
                        Update
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyList;
