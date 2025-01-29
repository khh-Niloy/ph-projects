import React, { useContext } from "react";
import { AuthContext } from "@/Provider/AuthContextProvider";
import useRole from "@/Hooks/useRole";
import UserMenu from "@/Dashboard/Sidebar/UserMenu/UserMenu";
import DeliveryMenMenu from "@/Dashboard/Sidebar/DeliveryMenMenu/DeliveryMenMenu";
import AdminMenu from "@/Dashboard/Sidebar/AdminMenu/AdminMenu";

const Footer = () => {
  const { user } = useContext(AuthContext);
  const { role } = useRole();

  const links =
    (role === "user" && <UserMenu />) ||
    (role === "deliverymen" && <DeliveryMenMenu />) ||
    (role === "admin" && <AdminMenu />) ||
    "";

  return (
    <div>
      <footer
        className={`w-full flex flex-col items-center justify-center relative bg-gradient-to-br from-[#f5f5f58f] to-[white] text-base-content p-10 pt-32 pb-20`}
      >
        <div className="flex items-center flex-col mx-auto gap-10">
          <aside className="flex items-center flex-col gap-2 z-20 relative">
            <div className="flex items-center justify-center gap-2">
              <img
                className="xl:w-[3.5%] w-[10%] sm:w-[6%] md:w-[5%] lg:w-[4%]"
                src="https://i.ibb.co.com/Yf5r1ZP/150897931-10529427.png"
                alt=""
              />
              <h1 className="text-3xl font-bold">FastPathao</h1>
            </div>
          </aside>

          <div className="flex lg:flex-row flex-col lg:gap-20 gap-10 mt-10 lg:mt-10 z-20 relative">
            <nav className="flex flex-col">
              <h6 className={`text-[19px] font-semibold mb-4 text-black`}>
                Contact info
              </h6>
              <div className={`flex flex-col gap-2 text-black t text-sm`}>
                <h1>Email Address: fastpathao01@gmail.com</h1>
                <h1>Phone Number: 01915910241</h1>
                <h1>
                  Address: House 113, Road 11, Block E, Banani, Dhaka 1213,
                  Bangladesh.
                </h1>
                <h1>Support Hours: Mon-Fri: 9 AM - 6 PM</h1>
              </div>
            </nav>
            <nav className="flex flex-col">
              <h1 className={`text-[19px] font-semibold mb-4 text-black`}>
                Relevant Links
              </h1>
              <ul className="flex flex-col text-left text-sm list-inside gap-3 underline">
                {links}
              </ul>
            </nav>
          </div>
        </div>
        <h1 className={`pt-20 text-center text-sm z-50 text-black/50"`}>
          Copyright © 2025, FastPathao. <br />
          FastPathao is a registered trademark of FastPathao. All rights
          reserved.
        </h1>
      </footer>
    </div>
  );
};

export default Footer;
