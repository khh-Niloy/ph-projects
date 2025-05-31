import axios from "axios";

export async function getAllDeliveries(email: string) {
  const response = await axios.get(
    `${process.env.BASE_URL}/api/dashboard/my-deliveries/${email}`
  );
  const data = await response.data;
  return data;
}
