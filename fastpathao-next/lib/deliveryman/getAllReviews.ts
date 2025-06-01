import axios from "axios";

export default async function getAllReviews(email: string) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboard/deliveryman/my-review/${email}`
  );
  return response.data;
}
