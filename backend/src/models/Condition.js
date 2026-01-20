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

    lifecycleStatus: {
      type: String,
      enum: ["ACTIVE", "PAUSED"],
      default: "ACTIVE",
    },

    executionStatus: {
      type: String,
      enum: ["PENDING", "FULFILLED"],
      default: "PENDING",
    },

    config: {
      type: Object,
      required: true,
    },


    fulfilledAt: {
      type: Date,
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
