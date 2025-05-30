import axios from "axios";

export async function getParcelByID(parcelID: string) {
  const response = await axios.get(
    `http://localhost:3000/api/dashboard/my-parcel/update-parcel/${parcelID}`
  );
  const data = await response.data;
  return data;
}
