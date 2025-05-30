import mongoose from "mongoose";

const DeliveryManSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    isAvailable: {
      type: Boolean,
      require: true,
    },
    number_of_parcel_delivered: {
      type: Number,
      require: true,
    },
    rating: {
      type: Number,
      require: true,
    },
    // role: {
    //   type: String,
    //   require: true,
    //   enum: ["deliverymen"],
    //   default: "deliverymen",
    // },
  },
  {
    timestamps: true,
  }
);

export const Deliverymen =
  mongoose.models.Deliverymen ||
  mongoose.model("Deliverymen", DeliveryManSchema);
