import axios from "axios";

export default function getAllFood() {
  return axios.get(`${process.env.BASE_URL}/api/foods`);
}
