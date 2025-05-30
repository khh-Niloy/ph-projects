import axios from "axios";

export async function getAllDeliveryMen() {
  const response = await axios.get(
    `${process.env.BASE_URL}/api/dashboard/all-deliverymen`
  );
  const data = await response.data;
  return data;
  //   console.log(data);
}
