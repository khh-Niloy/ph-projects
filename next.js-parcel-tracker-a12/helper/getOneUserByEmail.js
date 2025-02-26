import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
export const getOneUserByEmail = (email) => {
  connectDB();
  const user = User.findOne({ email });
  return user;
};
