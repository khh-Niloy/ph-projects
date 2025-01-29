import React from "react";

const TopDeliveryMan = ({ topDeliveryMan }) => {
  const top3DeliverMan = topDeliveryMan
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 lg:gap-0 xl:gap-5 w-full">
        {top3DeliverMan.map((e, index) => (
          <div
            key={index}
            className={`shadow-xl ml-5 p-6 border border-black/10 rounded-xl duration-300 hover:scale-[1.03] hover:shadow-xl`}
          >
            <div className="flex items-center gap-3">
              <img
                src={e.image}
                className="lg:w-14 w-12 h-12 lg:h-14 rounded-full object-cover"
                alt=""
              />

              <div className="-translate-y-1">
                <h1 className={`font-semibold lg:text-lg text-md mt-2 `}>
                  {e.name}
                </h1>
                <h1 className="text-sm">Average Rating: {e.rating}</h1>
              </div>
            </div>
            <p className={`text-sm font-normal mt-4`}>
              Successfully completed {e.number_of_parcel_delivered} deliveries
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDeliveryMan;
