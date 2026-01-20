import ActivityLog from "../models/ActivityLog.js";

export const getMyActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find({
      owner: req.user.id,
    })
      .sort({ createdAt: -1 })
      .limit(100);

    return res.json(logs);
  } catch (error) {
    console.error("Fetch activity logs error:", error);
    return res.status(500).json({
      message: "Failed to load activity logs",
    });
  }
};
