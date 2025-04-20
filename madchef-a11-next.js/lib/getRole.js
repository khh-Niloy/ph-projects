import axios from "axios";

export async function getRole(userEmail) {
  const res = await axios.post(`/api/role`, {
    email: userEmail,
  });

  return res;
}
