import React, { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthContextProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { imageUpload } from "../../../api/imagebb_api";
import { toast } from "../../../Hooks/use-toast";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: loggedInUserInfo = [], refetch } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user-info/${user?.email}`);
      return data;
    },
  });

  const {
    image,
    email,
    phonenumber,
    role,
    name,
    number_of_parcel_delivered,
    number_of_parcel_booked,
    total_spent_amount,
  } = loggedInUserInfo || {};

  async function handleUpdateImage(event) {
    event.preventDefault();
    const form = event.target;
    const image = form.image.files[0];
    const photoURL = await imageUpload(image);
    const updateImage = { image: photoURL };
    await axiosSecure.patch(`/update-profile-pic/${user?.email}`, updateImage);
    await updateUserProfile(name, photoURL);
    toast({
      title: <span style={{ color: "#00D26A" }}>Updated!</span>,
      description: "Your profile pic updated",
      variant: "default",
      className: "bg-[black] text-white shadow-lg",
      style: {
        padding: "16px",
      },
      duration: 2000,
    });
    refetch();
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-8">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            {/* Profile Picture Section */}
            <div className="w-full md:w-1/3 flex flex-col items-center">
              <img
                src={image || "https://via.placeholder.com/150"}
                alt={name}
                className="w-40 h-40 rounded-full object-cover shadow-md"
              />

              <form
                onSubmit={handleUpdateImage}
                className="mt-4 w-full flex flex-col gap-3"
              >
                <div className="relative w-full">
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    className="hidden"
                  />
                  <label
                    htmlFor="image"
                    className="w-full cursor-pointer text-center text-sm text-gray-600 hover:text-[#E83434] transition-colors bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:border-[#E83434] block"
                  >
                    Choose New Photo
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#E83434] text-white px-6 py-2 rounded-lg hover:bg-[#d42e2e] transition-colors text-sm"
                >
                  Update Photo
                </button>
              </form>
            </div>

            {/* User Info Section */}
            <div className="flex-1">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {name}
                </h1>
                <span className="inline-block bg-[#E83434] bg-opacity-10 text-[#E83434] px-3 py-1 rounded-full text-sm font-medium capitalize">
                  {role}
                </span>
              </div>

              <h1 className="text-gray-600 pb-5">User Information:</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="text-base font-medium text-gray-800">
                      {email}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">
                      Phone Number
                    </label>
                    <p className="text-base font-medium text-gray-800">
                      {phonenumber}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {number_of_parcel_delivered && (
                    <div>
                      <label className="text-sm text-gray-500">
                        Parcels Delivered
                      </label>
                      <p className="text-base font-medium text-[#E83434]">
                        {number_of_parcel_delivered}
                      </p>
                    </div>
                  )}
                  {number_of_parcel_booked && (
                    <div>
                      <label className="text-sm text-gray-500">
                        Parcels Booked
                      </label>
                      <p className="text-base font-medium text-[#E83434]">
                        {number_of_parcel_booked}
                      </p>
                    </div>
                  )}
                  {total_spent_amount && (
                    <div>
                      <label className="text-sm text-gray-500">
                        Total Spent
                      </label>
                      <p className="text-base font-medium text-[#E83434]">
                        ${total_spent_amount}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
