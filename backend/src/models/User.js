import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },

    assetCount: {
      type: Number,
      default: 0,
    },

    trustedPeopleCount: {
      type: Number,
      default: 0,
    },


    plan: {
      type: String,
      enum: ["FREE", "PRO"],
      default: "FREE",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    emailVerificationToken: {
      type: String,
    },

    emailVerificationExpires: {
      type: Date,
    },

    lastActiveAt: {
      type: Date,
      default: Date.now,
    },

  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
