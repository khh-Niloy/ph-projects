import axios from "axios";

export async function getParcelinfo(email: string) {
  const response = await axios.get(
    `${process.env.BASE_URL}/api/dashboard/my-parcel/${email}`
  );
  const data = await response.data;
  return data;
}
