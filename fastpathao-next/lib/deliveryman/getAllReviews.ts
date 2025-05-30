import axios from "axios";

export default async function getAllReviews(email) {
  const response = await axios.get(
    `${process.env.BASE_URL}/api/dashboard/my-review/${email}`
  );
  return response.data;
}
