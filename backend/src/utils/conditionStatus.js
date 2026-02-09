export function resolveConditionStatus({
  condition,
  userLastActiveAt,
  now = new Date(),
}) {
  
  const baseResponse = {
    status: "SAFE",
    daysRemaining: null,
    triggeredAt: null,
  };

  if (!condition || !userLastActiveAt) {
    return baseResponse;
  }

  // Currently we only evaluate INACTIVITY type
  if (condition.type !== "INACTIVITY") {
    return baseResponse;
  }

  const inactivityDays = condition.config?.inactivityDays;

  if (!inactivityDays || inactivityDays <= 0) {
    return baseResponse;
  }

  const lastActiveDate = new Date(userLastActiveAt);
  const triggerDate = new Date(lastActiveDate);
  triggerDate.setDate(triggerDate.getDate() + inactivityDays);

  const msRemaining = triggerDate - now;
  const daysRemaining = Math.ceil(msRemaining / (1000 * 60 * 60 * 24));

  const WARNING_THRESHOLD = 3;

  if (daysRemaining <= 0) {
    return {
      status: "TRIGGERED",
      daysRemaining: 0,
      triggeredAt: triggerDate,
    };
  }

  if (daysRemaining <= WARNING_THRESHOLD) {
    return {
      status: "WARNING",
      daysRemaining,
      triggeredAt: null,
    };
  }

  return {
    status: "SAFE",
    daysRemaining,
    triggeredAt: null,
  };
}
