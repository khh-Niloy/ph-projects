import React, { useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [addToCart, setaddToCart] = useState([]);
  const [addToWishlist, setaddToWishlist] = useState([]);
  const [money, setmoney] = useState(0)
  return (
    <UserContext.Provider
      value={{ addToCart, setaddToCart, addToWishlist, setaddToWishlist, money, setmoney }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
