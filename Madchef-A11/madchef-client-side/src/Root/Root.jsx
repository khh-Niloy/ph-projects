import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { DarkModeContext } from "../DarkModeProvider/DarkModeProvider";

const Root = () => {
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(false);
  const { toggleDarkMode, isDarkMode } = useContext(DarkModeContext);

  useEffect(() => {
    if (navigation?.state === "loading") {
      setisLoading(true);
    } else {
      setisLoading(false);
    }
  }, [navigation?.state]);

  return (
    <div className="font">
      <Navbar></Navbar>
      {isLoading && (
        <div
          className={`fixed inset-0 flex items-center justify-center ${
            isDarkMode ? "bg-[#191A23]" : "bg-white"
          } z-50`}
        >
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      <Outlet />
      <Footer></Footer>
    </div>
  );
};

export default Root;
