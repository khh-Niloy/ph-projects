import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthContextProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: role = {}, isLoading } = useQuery({
    queryKey: ["userrole", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user-role/${user?.email}`);
      return data.role;
    },
    enabled: !!user?.email,
  });

  return { role, isLoading };
};

export default useRole;
