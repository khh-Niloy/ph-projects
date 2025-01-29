import React from "react";
import { toast } from "../Hooks/use-toast";
import { HiCheckCircle } from "react-icons/hi";

export const ComponentContext = React.createContext();
const ComponentProvider = ({ children }) => {
  function toastMessage(titleText, descriptionText, titleTextColor, bgColor) {
    toast({
      title: (
        <div
          className={`text-[#0E7537] text-[${titleTextColor}] flex items-center gap-1 text-base`}
        >
          <HiCheckCircle></HiCheckCircle> <span>{titleText}!</span>
        </div>
      ),
      description: `${descriptionText}`,
      variant: "default",
      className: `bg-[${bgColor}] text-[#0E7537] p-5 shadow-lg`,
      duration: 2000,
    });
  }

  return (
    <ComponentContext.Provider value={{ toastMessage }}>
      {children}
    </ComponentContext.Provider>
  );
};

export default ComponentProvider;
