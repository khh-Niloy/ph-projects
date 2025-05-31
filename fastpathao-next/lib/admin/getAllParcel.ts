import axios from "axios";

export async function getAllParcel() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboard/all-parcel`
  );
  const data = await response.data;
  return data;
}
