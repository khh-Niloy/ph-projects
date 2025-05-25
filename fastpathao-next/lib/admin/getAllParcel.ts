import axios from "axios";

export async function getAllParcel() {
  const response = await axios.get(
    `http://localhost:3000/api/dashboard/all-parcel`
  );
  const data = await response.data;
  return data;
}
