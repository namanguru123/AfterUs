import mongoose from "mongoose";

const trustedPersonSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    relation: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "VERIFIED"],
      default: "PENDING",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
    },
    
    verificationExpires: {
      type: Date,
    },

  },
  { timestamps: true }
);

export default mongoose.model("TrustedPerson", trustedPersonSchema);
