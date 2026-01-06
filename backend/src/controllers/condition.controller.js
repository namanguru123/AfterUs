import Condition from "../models/Condition.js";
import { logActivity } from "../utils/activityLogger.js";

export const createCondition = async (req, res) => {
  try {
    const { type, config, linkedAssets = [], trustedPeople = [] } = req.body;

    if (!type || !config) {
      return res.status(400).json({ message: "Type and config are required" });
    }

    if (!["INACTIVITY", "MANUAL", "TIME_BASED"].includes(type)) {
      return res.status(400).json({ message: "Invalid condition type" });
    }

    if (
      type === "INACTIVITY" &&
      typeof config.inactivityDays !== "number"
    ) {
      return res
        .status(400)
        .json({ message: "inactivityDays must be a number" });
    }

    const condition = await Condition.create({
      owner: req.user.id,
      type,
      config,
      linkedAssets,
      trustedPeople,
    });

    await logActivity(req.user.id, {
      type: "CONDITION_CREATED",
      title: "Condition created",
      description: `${type} condition created`,
    });

    res.status(201).json(condition);
  } catch (err) {
    res.status(500).json({ message: "Failed to create condition" });
  }
};



export const getMyConditions = async (req, res) => {
  try {
    const conditions = await Condition.find({
      owner: req.user.id,
      isDeleted: false,
    })
      .populate("linkedAssets", "title")
      .populate("trustedPeople", "name email status")
      .sort({ createdAt: -1 });

    res.json(conditions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch conditions" });
  }
};

export const toggleConditionStatus = async (req, res) => {
  try {
    const condition = await Condition.findOne({
      _id: req.params.id,
      owner: req.user.id,
      isDeleted: false,
    });

    if (!condition) {
      return res.status(404).json({ message: "Condition not found" });
    }

    condition.status =
      condition.status === "ACTIVE" ? "PAUSED" : "ACTIVE";

    await condition.save();

    await logActivity(req.user.id, {
      type: "CONDITION_UPDATED",
      title: "Condition updated",
      description: `Condition ${condition.status.toLowerCase()}`,
    });

    res.json({ status: condition.status });
  } catch (err) {
    res.status(500).json({ message: "Failed to update condition" });
  }
};

export const deleteCondition = async (req, res) => {
  try {
    const condition = await Condition.findOne({
      _id: req.params.id,
      owner: req.user.id,
      isDeleted: false,
    });

    if (!condition) {
      return res.status(404).json({ message: "Condition not found" });
    }

    condition.isDeleted = true;
    await condition.save();

    await logActivity(req.user.id, {
      type: "CONDITION_DELETED",
      title: "Condition deleted",
      description: "A condition was removed",
    });

    res.json({ message: "Condition deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

export const triggerConditionManually = async (req, res) => {
  const condition = await Condition.findOne({
    _id: req.params.id,
    owner: req.user.id,
    status: "ACTIVE",
    isDeleted: false,
  });

  if (!condition || condition.type !== "MANUAL") {
    return res.status(400).json({ message: "Invalid manual condition" });
  }

  condition.status = "TRIGGERED";
  condition.triggeredAt = new Date();
  await condition.save();

  await logActivity(req.user.id, {
    type: "CONDITION_TRIGGERED",
    title: "Emergency condition triggered",
    description: "Manual emergency condition activated",
  });

  res.json({ message: "Condition triggered" });
};

export const getConditionById = async (req, res) => {
  const condition = await Condition.findOne({
    _id: req.params.id,
    owner: req.user.id,
    isDeleted: false,
  })
    .populate("linkedAssets", "title")
    .populate("trustedPeople", "name email status");

  if (!condition) {
    return res.status(404).json({ message: "Condition not found" });
  }

  console.log("BACKEND CONDITION:", condition);

  res.json(condition);
};


export const updateConditionAssets = async (req, res) => {
  try {
    const { assets } = req.body;

    if (!Array.isArray(assets)) {
      return res.status(400).json({ message: "Assets must be an array" });
    }

    

    const condition = await Condition.findOne({
      _id: req.params.id,
      owner: req.user.id,
      isDeleted: false,
    })
    .populate("linkedAssets", "title")
    .populate("trustedPeople", "name email status");


    if (!condition) {
      return res.status(404).json({ message: "Condition not found" });
    }

    condition.linkedAssets = assets;
    await condition.save();

    await logActivity(req.user.id, {
      type: "CONDITION_UPDATED",
      title: "Assets linked to condition",
      description: `Assets updated for ${condition.type} condition`,
    });

    res.json(condition);
  } catch (err) {
    res.status(500).json({ message: "Failed to update assets" });
  }
};

export const updateConditionTrustedPeople = async (req, res) => {
  try {
    const { trustedPeople } = req.body;

    if (!Array.isArray(trustedPeople)) {
      return res.status(400).json({
        message: "trustedPeople must be an array",
      });
    }

    const condition = await Condition.findOne({
      _id: req.params.id,
      owner: req.user.id,
      isDeleted: false,
    });

    if (!condition) {
      return res.status(404).json({ message: "Condition not found" });
    }

    condition.trustedPeople = trustedPeople;
    await condition.save();

    await logActivity(req.user.id, {
      type: "CONDITION_UPDATED",
      title: "Trusted people updated",
      description: "Trusted people linked to condition",
    });

    res.json({
      message: "Trusted people updated successfully",
      trustedPeople: condition.trustedPeople,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to update trusted people",
    });
  }
};
