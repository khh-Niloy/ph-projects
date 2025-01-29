import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const HomeStats = ({ homeStats }) => {
  const { allUser, allBookParcel, totalCount } = homeStats || "";

  const { ref, inView } = useInView({
    triggerOnce: true, // To trigger the count only once
    threshold: 0.5, // Trigger when 50% of the section is in view
  });

  return (
    <div
      ref={ref}
      className="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-3 gap-5 text-center"
    >
      {inView && (
        <>
          <div className="py-4 hover:bg-[#e83434] hover:text-white duration-300 hover:scale-[1.03] hover:shadow-xl border border-black/10 rounded-lg">
            <h1 className="text-3xl font-semibold">
              <CountUp
                start={0}
                end={allBookParcel}
                duration={3}
                separator=","
              />
            </h1>
            <h1 className="text-md mt-2 font-normal">Total Parcels Booked</h1>
          </div>
          <div className="py-4 hover:bg-[#e83434] hover:text-white duration-300 hover:scale-[1.03] hover:shadow-xl border border-black/10 rounded-lg text-center">
            <h1 className="text-3xl font-semibold">
              <CountUp start={0} end={totalCount} duration={3} separator="," />
            </h1>
            <h1 className="text-md mt-2 font-medium">
              Total Parcels Delivered
            </h1>
          </div>
          <div className="py-4 hover:bg-[#e83434] hover:text-white duration-300 hover:scale-[1.03] hover:shadow-xl border border-black/10 rounded-lg text-center">
            <h1 className="text-3xl font-semibold">
              <CountUp start={0} end={allUser} duration={3} separator="," />
            </h1>
            <h1 className="text-md mt-2 font-medium">Total Happy Users</h1>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeStats;
