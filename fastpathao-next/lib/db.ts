import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
};

export default connectDB;
