"use client";

import { AuthContext } from "@/context/AuthContextProvider";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const MyFood = () => {
  const { user } = useContext(AuthContext);
  const [myFood, setmyFood] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`/api/foods?userEmail=${user?.email}`);
      const data = await res.data;
      setmyFood(data);
    }
    fetchData();
  }, [user?.email]);

  return (
    <div>
      {myFood.map((e, index) => (
        <div key={index}>
          <h1>{e.foodname}</h1>
        </div>
      ))}
    </div>
  );
};

export default MyFood;
