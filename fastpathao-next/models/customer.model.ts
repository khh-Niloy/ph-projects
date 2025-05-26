import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
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
    isAppliedForDeliveryman: {
      type: Boolean,
      require: true,
    },

    number_of_parcel_booked: {
      type: Number,
      require: true,
    },
    total_spent_amount: {
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

export const Customer =
  mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);
