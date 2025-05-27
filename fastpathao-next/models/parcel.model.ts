import mongoose from "mongoose";

const parcelSchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
      required: true,
    },
    senderEmail: {
      type: String,
      required: true,
    },
    senderPhoneNumber: {
      type: String,
      required: true,
    },
    receiverName: {
      type: String,
      required: true,
    },
    receiverEmail: {
      type: String,
      required: true,
    },
    receiverPhoneNumber: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    requestedDeliveryDate: {
      type: Date,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    deliveryAddressLatitude: {
      type: Number,
      required: true,
    },
    deliveryAddressLongitude: {
      type: Number,
      required: true,
    },
    parcelType: {
      type: String,
      required: true,
    },
    parcelWeight: {
      type: Number,
      required: true,
    },
    deliveryCharge: {
      type: Number,
      required: true,
    },
    deliverystatus: {
      type: String,
      enum: ["pending", "assigned", "picked", "delivered", "cancelled"],
      default: "pending",
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid", null],
      default: null,
    },
    assignedDeliveryManID: {
      type: String,
    },
    approximateDeliveryDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Parcel =
  mongoose.models.Parcel || mongoose.model("Parcel", parcelSchema);
