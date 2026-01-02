import mongoose from "mongoose";

const conditionSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["INACTIVITY", "MANUAL", "TIME_BASED"],
      required: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "PAUSED", "TRIGGERED"],
      default: "ACTIVE",
    },

    config: {
      type: Object,
      required: true,
    },

    linkedAssets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DigitalAsset",
      },
    ],

    trustedPeople: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TrustedPerson",
      },
    ],

    lastCheckedAt: {
      type: Date,
    },

    triggeredAt: {
      type: Date,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Condition", conditionSchema);
