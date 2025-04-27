import axios from "axios";

export async function getFood(id) {
  const res = await axios.get(`http://localhost:3000/api/foods/${id}`);
  const data = await res.data;
  return data;
}
