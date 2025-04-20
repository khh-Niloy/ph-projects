import axios from "axios";

export async function getFood(id) {
  const res = await axios.get(`${process.env.BASE_URL}/api/foods/${id}`);
  const data = await res.data;
  return data;
}
