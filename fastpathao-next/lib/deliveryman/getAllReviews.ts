import axios from "axios";

export default async function getAllReviews(email) {
  const response = await axios.get(
    `http://localhost:3000/api/dashboard/my-review/${email}`
  );
  return response.data;
}
