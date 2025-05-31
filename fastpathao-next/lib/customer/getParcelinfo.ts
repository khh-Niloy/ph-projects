import axios from "axios";

export async function getParcelinfo(email: string) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboard/my-parcel/${email}`
  );
  const data = await response.data;
  return data;
}
