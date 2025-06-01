import axios from "axios";

export async function getAllDeliveries(email: string) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboard/deliveryman/my-deliveries/${email}`
  );
  const data = await response.data;
  return data;
}
