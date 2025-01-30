import React from "react";
import { toast } from "../Hooks/use-toast";
import { HiCheckCircle } from "react-icons/hi";

export const ComponentContext = React.createContext();
const ComponentProvider = ({ children }) => {
  function toastMessage(titleText, descriptionText, titleTextColor, bgColor) {
    toast({
      title: (
        <div
          className="flex items-center gap-1 text-base"
          style={{ color: titleTextColor }}
        >
          <HiCheckCircle /> <span>{titleText}!</span>
        </div>
      ),
      description: (
        <span style={{ color: titleTextColor }}>{descriptionText}</span>
      ),
      variant: "default",
      className: "p-5 shadow-lg",
      duration: 2000,
      style: { backgroundColor: bgColor, color: "#0E7537" }, // Dynamic styling
    });
  }

  return (
    <ComponentContext.Provider value={{ toastMessage }}>
      {children}
    </ComponentContext.Provider>
  );
};

export default ComponentProvider;
