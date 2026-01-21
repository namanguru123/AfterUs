import mongoose from "mongoose";

const accessRuleSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    trustedContact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrustedContact",
      required: true,
    },

    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DigitalAsset",
      required: true,
    },

    condition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Condition",
      required: true,
    },

    accessType: {
      type: String,
      enum: ["VIEW", "DOWNLOAD"],
      default: "VIEW",
    },

    status: {
      type: String,
      enum: ["INACTIVE", "ACTIVE"],
      default: "INACTIVE",
    },

    activatedAt: {
      type: Date,
    },

    isRevoked: {
      type: Boolean,
      default: false,
    },

    revealCount: {
      type: Number,
      default: 0,
    },

  },
  { timestamps: true }
);

export default mongoose.model("AccessRule", accessRuleSchema);
