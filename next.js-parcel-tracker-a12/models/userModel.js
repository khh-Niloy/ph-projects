import mongoose from "mongoose";

const newUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "PhoneNumber is required"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: ["user", "deliveryman"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    metadata: {
      total_spent_amount: {
        type: Number,
        default: 0,
      },
      number_of_parcel_booked: {
        type: Number,
        default: 0,
      },
      number_of_parcel_delivered: {
        type: Number,
        default: 0,
      },
      rating: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", newUserSchema);

export default User;
