import React from "react";
import Banner from "./Banner";
import Features from "./Features";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import HomeStats from "./HomeStats";
import TopDeliveryMan from "./TopDeliveryMan";

const Home = () => {
  const axiosPublic = useAxiosPublic();
  const { data: homeStats = [] } = useQuery({
    queryKey: ["homestats"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/home-stats");
      return data;
    },
  });
  const { data: topDeliveryMan = [] } = useQuery({
    queryKey: ["topDeliveryMan"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/all-role?role=deliverymen");
      return data;
    },
  });

  return (
    <div>
      <div className="pt-12 translate-y-0.5">
        <Banner></Banner>
      </div>
      <div id="cards" className="w-[88%] mx-auto pt-20 pb-20">
        <h1 className="text-center text-3xl font-medium">
          Our Exclusive Features
        </h1>
        <p className="text-center mt-1">
          Streamline your parcel tracking, delivery, and management with ease.
        </p>

        <div
          id="cards"
          className="xl:w-[70%] lg:w-[90%] sm:w-full w-[90%] mx-auto mt-10"
        >
          <Features></Features>
        </div>

        <div className="mt-20">
          <h1 className="text-center text-3xl font-medium">
            App Usage Statistics
          </h1>
          <p className="text-center mt-1">
            Track the Growth and Impact of Our Platform at a Glance
          </p>
          <div className="xl:w-[70%] lg:w-[70%] sm:w-full w-[90%] mx-auto mt-10">
            <HomeStats homeStats={homeStats}></HomeStats>
          </div>
        </div>

        <div className="mt-20">
          <h1 className="text-center text-3xl font-medium">
            Top 3 Delivery Heroes
          </h1>
          <p className="text-center mt-1">
            Delivery Champions and Their Impressive Track Records
          </p>
          <div className="xl:w-[90%] lg:w-full w-[90%] mx-auto mt-10">
            <TopDeliveryMan topDeliveryMan={topDeliveryMan}></TopDeliveryMan>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
