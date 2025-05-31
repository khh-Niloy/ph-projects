import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }

  try {
    if (mongoose.connection.readyState >= 1) return;

    await mongoose.connect(mongoUri); // Now guaranteed string

    console.log("✅ MongoDB Connected");
  } catch (err) {
    if (err instanceof Error) {
      console.error("MongoDB connection failed:", err.message);
    } else {
      console.error("MongoDB connection failed:", err);
    }
  }
};

export default connectDB;
