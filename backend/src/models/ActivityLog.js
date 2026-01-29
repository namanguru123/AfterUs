import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    action: {
      type: String,
      required: true,
      enum: [
        "ASSET_CREATED",
        "ASSET_UPDATED",
        "ASSET_DELETED",
        "SENSITIVE_DATA_REVEALED",
        "TRUSTED_PERSON_ADDED",
        "TRUSTED_PERSON_VERIFIED",
        "TRUSTED_PERSON_DELETED",
        "CONDITION_CREATED",
        "CONDITION_UPDATED",
        "CONDITION_FULFILLED",
        "CONDITION_DELETED",
      ],
    },

    entityType: {
      type: String,
      required: true,
      enum: ["ASSET", "TRUSTED_PERSON", "CONDITION"],
    },

    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ActivityLog", activityLogSchema);
