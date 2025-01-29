import useRole from "@/Hooks/useRole";
import { AuthContext } from "@/Provider/AuthContextProvider";
import LoadingSpinner from "@/Shared/LoadingSpinner";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <LoadingSpinner></LoadingSpinner>;
  if (user) return children;
  return <Navigate to="/login"></Navigate>;
};

export default PrivateRouter;
