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
      owner,
      action,
      entityType,
      entityId,
      message,
    });
  } catch (err) {
    // Logging should NEVER break main flow
    console.error("Activity log failed:", err.message);
  }
};
