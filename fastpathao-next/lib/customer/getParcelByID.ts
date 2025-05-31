import axios from "axios";

export async function getParcelByID(parcelID: string) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboard/my-parcel/update-parcel/${parcelID}`
  );
  const data = await response.data;
  return data;
}
