import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("connected to mongoDB");
    });

    connection.on("error", (error) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " +
          error
      );
      process.exit();
    });
  } catch (error) {
    console.log("error on mongodb", error);
  }
};
