import Condition from "../models/Condition.js";
import User from "../models/User.js";
import { logActivity } from "../utils/activityLogger.js";

export const runConditionChecks = async () => {
  const now = new Date();

  const conditions = await Condition.find({
    status: "ACTIVE",
    isDeleted: false,
  }).populate("owner");

  for (const condition of conditions) {
    const user = condition.owner;

    if (condition.type === "INACTIVITY") {
      const inactiveDays = condition.config.days;
      const diff =
        (now - new Date(user.lastActiveAt)) / (1000 * 60 * 60 * 24);

      if (diff >= inactiveDays) {
        await triggerCondition(condition);
      }
    }

    if (condition.type === "TIME_BASED") {
      if (now >= new Date(condition.config.triggerAt)) {
        await triggerCondition(condition);
      }
    }

    condition.lastCheckedAt = now;
    await condition.save({ validateBeforeSave: false });
  }
};

const triggerCondition = async (condition) => {
  condition.status = "TRIGGERED";
  condition.triggeredAt = new Date();
  await condition.save();

  await logActivity(condition.owner._id, {
    type: "CONDITION_TRIGGERED",
    title: "Condition triggered",
    description: `Condition ${condition.type.toLowerCase()} triggered`,
  });
};
