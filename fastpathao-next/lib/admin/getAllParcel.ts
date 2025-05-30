import axios from "axios";

export async function getAllParcel() {
  const response = await axios.get(
    `${process.env.BASE_URL}/api/dashboard/all-parcel`
  );
  const data = await response.data;
  return data;
}
