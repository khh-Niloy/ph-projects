import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContextProvider";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const { user, loading, setloading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRouter;
