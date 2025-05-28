import axios from "axios";

export async function getAllDeliveries(email) {
  const response = await axios.get(
    `http://localhost:3000/api/dashboard/my-deliveries/${email}`
  );
  const data = await response.data;
  return data;
}
