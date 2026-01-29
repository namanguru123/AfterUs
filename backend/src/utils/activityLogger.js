import mongoose from "mongoose";
import ActivityLog from "../models/ActivityLog.js";

export const logActivity = async ({
  owner,
  action,
  entityType,
  entityId,
  message,
}) => {
  try {
    await ActivityLog.create({
      owner: new mongoose.Types.ObjectId(owner),
      action,
      entityType,
      entityId: new mongoose.Types.ObjectId(entityId),
      message,
    });
  } catch (err) {
    console.error("Activity log failed:", err);
  }
};
