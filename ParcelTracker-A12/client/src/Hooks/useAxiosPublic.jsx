import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://parcel-tracker-server-seven.vercel.app", // Change this to match your Express backend URL
});

const useAxiosPublic = () => {
  
  return axiosPublic;
};

export default useAxiosPublic;
