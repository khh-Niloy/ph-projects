import mongoose from "mongoose";

const parcelSchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
      require: true,
    },
    senderEmail: {
      type: String,
      require: true,
    },
    senderPhoneNumber: {
      type: String,
      require: true,
    },
    receiverName: {
      type: String,
      require: true,
    },
    receiverEmail: {
      type: String,
      require: true,
    },
    receiverPhoneNumber: {
      type: String,
      require: true,
    },
    bookingDate: {
      type: Date,
      require: true,
    },
    requestedDeliveryDate: {
      type: Date,
      require: true,
    },
    deliveryAddress: {
      type: String,
      require: true,
    },
    deliveryAddressLatitude: {
      type: Number,
      require: true,
    },
    deliveryAddressLongitude: {
      type: Number,
      require: true,
    },
    parcelType: {
      type: String,
      require: true,
    },
    parcelWeight: {
      type: Number,
      require: true,
    },
    deliveryCharge: {
      type: Number,
      require: true,
    },
    deliverystatus: {
      type: String,
      enum: ["pending", "assigned", "picked", "delivered", "cancelled"],
      default: "pending",
      require: true,
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid", null],
      default: null,
      require: true,
    },
    assignedDeliveryManID: {
      type: String,
      require: true,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Parcel =
  mongoose.models.Parcel || mongoose.model("Parcel", parcelSchema);
