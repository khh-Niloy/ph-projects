import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthContextProvider";
import { Star } from "lucide-react";

const MyReview = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: async () => {
      const data = await axiosSecure.get(`/deliveryMan-reviews/${user?.email}`);
      return data.data;
    },
  });

  return (
    <>
      <h1 className="mt-4 text-center text-3xl font-bold text-gray-900">
        My Reviews
      </h1>
      <p className="text-gray-600 pb-10 text-center">
        View all feedback and ratings shared by users for your deliveries.
      </p>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 w-full">
        {reviews.map((e, index) => (
          <div
            key={index}
            className={`shadow-xl ml-5 p-6 lg:h-[14.5rem] h-[13rem] xl:h-[13rem] border border-black/10 rounded-xl`}
          >
            <div className="flex items-center gap-3">
              <img
                src={e.usersImage}
                className="lg:w-14 w-8 h-8 lg:h-14 rounded-full object-cover"
                alt=""
              />

              <div className="-translate-y-1">
                <h1 className={`font-semibold lg:text-lg text-md mt-2 `}>
                  {e.usersName}
                </h1>
                <h1 className="text-xs">Rating: {e.rating}</h1>
                <h1 className="text-xs">
                  Reviewed on: {e.review_giving_date.split("T")[0]}
                </h1>
              </div>
            </div>
            <hr className="my-2" />
            <p className={`text-sm font-normal `}>{e.feedback}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyReview;
