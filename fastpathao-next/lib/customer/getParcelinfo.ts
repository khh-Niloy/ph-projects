import axios from "axios";

export async function getParcelinfo(email) {
  const response = await axios.get(
    `http://localhost:3000/api/dashboard/my-parcel/${email}`
  );
  const data = await response.data;
  return data;
}
