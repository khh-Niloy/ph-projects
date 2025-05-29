import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    reviewerName: {
      type: String,
      required: true,
    },
    reviewerPhoneNumber: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
    assignedDeliveryManID: {
      type: String,
    },
    review_giving_date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Review =
  mongoose.models.Review || mongoose.model("Review", ReviewSchema);
