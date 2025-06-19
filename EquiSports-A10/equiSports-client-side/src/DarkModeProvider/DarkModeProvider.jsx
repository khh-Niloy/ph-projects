import React, { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext();
const DarkModeProvider = ({ children }) => {
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const isDarkMode = true;

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
