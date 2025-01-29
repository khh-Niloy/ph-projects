import useRole from "@/Hooks/useRole";
import LoadingSpinner from "@/Shared/LoadingSpinner";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const UserPrivateRoutes = ({ children }) => {
  const { role, isLoading } = useRole();
  const location = useLocation();

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (role === "user") return children;
  return <Navigate state={location.pathname} to="/"></Navigate>;
};

export default UserPrivateRoutes;
