import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../Context/AuthContextProvider";

const Profile = () => {
  const { user, setuser, profileInfo, setloading, loading, toastShow } =
    useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    setloading(true);
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    profileInfo({ displayName: name, photoURL: photo }).finally(() => {
      setloading(false);
      toastShow("success", "Information updated");
    });
  }

  return (
    <>
      <Helmet>
        <title>Profile | NextStep</title>
      </Helmet>

      <div className="w-[80%] mx-auto">
        <div className="flex lg:flex-row flex-col items-center w-[80%] mx-auto pb-32 pt-16 lg:gap-32 gap-10">
          <div className="">
            <img
              src={user.photoURL}
              className="lg:max-w-44 w-32 rounded-md"
              alt=""
            />
            <h1 className="text-2xl mt-4 font-semibold">{user.displayName}</h1>
            <h1 className="text-sm mt-1 text-black/60">{user.email}</h1>
          </div>

          <div className="">
            <form onSubmit={handleSubmit}>
              <input
                name="name"
                type="text"
                placeholder="name"
                className="border border-black/10 rounded-lg p-2.5 focus:outline-black/10 placeholder:text-sm text-sm"
                required
              />
              <br />
              <input
                name="photo"
                type="text"
                placeholder="photo"
                className="border border-black/10 rounded-lg p-2.5 focus:outline-black/10 placeholder:text-sm text-sm mt-2"
                required
              />
              <br />
              <button className="mt-6 text-white bg-[#1888F5] px-4 py-1 rounded-full text-sm shadow-xl">
                save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
