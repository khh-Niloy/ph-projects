export const dynamic = "force-dynamic";

import getAllReviews from "@/lib/deliveryman/getAllReviews";
import React from "react";

export default async function page() {
  const email = "deliveryman_3@gmail.com";

  type Review = {
    _id: string;
    reviewerName: string;
    reviewerPhoneNumber: string;
    rating: number;
    feedback: string;
    review_giving_date: string;
  };

  const allReviews: Review[] = await getAllReviews(email);
  //   console.log(allReviews);

  return (
    <div className="bg-white h-screen">
      <h1 className="mt-4 text-center text-3xl font-bold text-gray-900">
        My Reviews
      </h1>
      <p className="text-gray-600 pb-10 text-center">
        View all feedback and ratings shared by users for your deliveries.
      </p>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 w-full">
        {allReviews.map(
          ({
            _id,
            reviewerName,
            reviewerPhoneNumber,
            rating,
            feedback,
            review_giving_date,
          }) => (
            <div
              key={_id}
              className={`shadow-xl ml-5 p-6 lg:h-[14.5rem] h-[13rem] xl:h-[13rem] border border-black/10 rounded-xl`}
            >
              <div className="flex items-center gap-3">
                <div className="-translate-y-1">
                  <h1 className={`font-semibold lg:text-lg text-md mt-2 `}>
                    {reviewerName}
                  </h1>
                  <h1 className={`font-semibold lg:text-lg text-md mt-2 `}>
                    {reviewerPhoneNumber}
                  </h1>
                  <h1 className="text-xs">Rating: {rating}</h1>
                  <h1 className="text-xs">
                    Reviewed on: {review_giving_date.split("T")[0]}
                  </h1>
                </div>
              </div>
              <hr className="my-2" />
              <p className={`text-sm font-normal `}>{feedback}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
