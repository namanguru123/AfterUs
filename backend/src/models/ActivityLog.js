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
      ],
    },

    entityType: {
      type: String,
      required: true,
      enum: ["ASSET"],
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
