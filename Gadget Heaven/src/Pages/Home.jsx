import React, { useContext } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useParams,
} from "react-router-dom";
import Hero from "../Components/Hero";
import { Helmet } from "react-helmet-async";

export default function Home() {
  const CategoryData = useLoaderData();

  return (
    <>
      <Helmet>
        <title>Home - Gadget Heaven</title>
      </Helmet>
      <div className=" bg-[#f6f6f6]">
        <div className="mx-auto">
          <Hero></Hero>

          <div className="lg:w-[80%] w-[90%] mx-auto pt-20 pb-32">
            <h1 className="text-3xl font-semibold text-center lg:pb-14 pb-10">
              Explore Cutting-Edge Gadgets
            </h1>

            <div className="grid lg:grid-cols-12 grid-cols-2 lg:gap-5 gap-3">
              <div className="lg:col-span-3 col-span-2">
                <div className="lg:flex lg:flex-col grid grid-cols-2 bg-white p-5 gap-5 rounded-xl border border-black/10">
                  {CategoryData.map((e, index) => (
                    <NavLink
                      to={`/home/${e.slug}`}
                      key={index}
                      className={({ isActive }) =>
                        `${
                          isActive
                            ? "bg-[#9538E2] text-white font-semibold"
                            : "bg-[#09080F]/5 text-[#09080F]/65 "
                        } p-3 text-xs rounded-full`
                      }
                    >
                      <h1 className="ml-1">{e.name}</h1>
                    </NavLink>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-9 col-span-2">
                <Outlet></Outlet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
