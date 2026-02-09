import Condition from "../models/Condition.js";
import { logActivity } from "../utils/activityLogger.js";
import AccessRule from "../models/AccessRule.js";
import TrustedPerson from "../models/TrustedPerson.js";
import ActivityLog from "../models/ActivityLog.js";
import { resolveConditionStatus } from "../utils/conditionStatus.js";
import User from "../models/User.js";

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

    await logActivity({
            owner: req.user.id,
            action: "CONDITION_CREATED",
            entityType: "CONDITION",
            entityId: condition.id,
            message: "Condition created",
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

  
    if(condition.lifecycleStatus === "ACTIVE") {
      condition.lifecycleStatus = "PAUSED";
    } else {
      condition.lifecycleStatus = "ACTIVE";
    }

    await condition.save();

    await logActivity(req.user.id, {
      type: "CONDITION_UPDATED",
      title: "Condition updated",
      description: `Condition ${condition.executionStatus.toLowerCase()}`,
    });

    res.json({ executionStatus: condition.executionStatus });
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

    await logActivity({
            owner: req.user.id,
            action: "CONDITION_DELETED",
            entityType: "CONDITION",
            entityId: condition.id,
            message: "Condition deleted",
          });

    res.json({ message: "Condition deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
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

    await logActivity({
            owner: req.user.id,
            action: "CONDITION_UPDATED",
            entityType: "CONDITION",
            entityId: condition.id,
            message: "Assets linked to condition",
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

    await logActivity({
            owner: req.user.id,
            action: "CONDITION_UPDATED",
            entityType: "CONDITION",
            entityId: condition.id,
            message: "Trusted people updated for condition",
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




export const triggerCondition = async (req, res) => {
  try {
    const conditionId = req.params.id;

    const condition = await Condition.findOne({
      _id: conditionId,
      owner: req.user.id,
      isDeleted: false,
    })
      .populate("linkedAssets")
      .populate("trustedPeople");

    if (!condition) {
      return res.status(404).json({ message: "Condition not found" });
    }

    // 🛑 GUARD: already fulfilled
    if (condition.executionStatus === "FULFILLED") {
      return res.status(400).json({
        message: "Condition already fulfilled",
      });
    }

    // 🛑 VALIDATION (NO STATE CHANGE YET)
    if (
      condition.type === "INACTIVITY" &&
      !condition.config?.inactivityDays
    ) {
      return res.status(400).json({
        message: "Inactivity days not configured",
      });
    }

    if (
      !condition.linkedAssets.length ||
      !condition.trustedPeople.length
    ) {
      return res.status(400).json({
        message: "Assets or trusted people not linked",
      });
    }

    // 🔐 CREATE ACCESS RULES
    const accessRules = [];

    for (const asset of condition.linkedAssets) {
      for (const person of condition.trustedPeople) {
        accessRules.push({
          owner: condition.owner,
          trustedContact: person.userId, // ✅ matches your AccessRule mapping
          asset: asset._id,
          condition: condition._id,
          status: "ACTIVE",
        });
      }
    }

    await AccessRule.insertMany(accessRules);

    // 🧾 ACTIVITY LOG
    await logActivity({
            owner: req.user.id,
            action: "CONDITION_FULFILLED",
            entityType: "CONDITION",
            entityId: condition.id,
            message: "Condition fulfilled and access rules created",
          });

    // ✅ COMMIT — THIS IS THE ONLY STATE CHANGE
    condition.executionStatus = "FULFILLED";
    condition.triggeredAt = new Date();
    await condition.save();

    return res.json({
      message: "Condition fulfilled successfully",
    });
  } catch (error) {
    console.error("TRIGGER CONDITION ERROR:", error);
    return res.status(500).json({
      message: "Failed to trigger condition",
    });
  }
};


// GET /api/conditions/:id/status
export const getConditionStatus = async (req, res) => {
  try {
    const userId = req.user.id; // ⚠️ important: id, not _id
    const { id: conditionId } = req.params;

    // 1. Fetch condition with ownership check
    const condition = await Condition.findOne({
      _id: conditionId,
      owner: userId,
    });

    if (!condition) {
      return res.status(404).json({
        message: "Condition not found",
      });
    }

    // 2. Fetch user's last activity
    const user = await User.findById(userId).select("lastActiveAt");

    // 3. Resolve status (pure logic)
    const statusResult = resolveConditionStatus({
      condition,
      userLastActiveAt: user?.lastActiveAt,
    });

    // 4. Return read-only response
    return res.status(200).json({
      conditionId: condition._id,
      type: condition.type,
      ...statusResult,
    });
  } catch (error) {
    console.error("Error resolving condition status:", error);
    return res.status(500).json({
      message: "Failed to resolve condition status",
    });
  }
};



// export const triggerCondition = async (req, res) => {
//   try {
//     if (condition.status === "FULFILLED") {
//       return res.status(400).json({
//         message: "Condition already triggered",
//       });
//     }


//     const { id } = req.params;


//     const condition = await Condition.findOne({
//       _id: id,
//       owner: req.user.id,
//       isDeleted: false,
//     });

//     if (!condition) {
//       return res.status(404).json({ message: "Condition not found" });
//     }

//     if (condition.executionStatus === "FULFILLED") {
//       return res.status(400).json({ message: "Condition already fulfilled" });
//     }

//     if (condition.lifecycleStatus !== "ACTIVE") {
//       return res.status(400).json({ message: "Condition is not active" });
//     }


    

 
//     // const trustedPeople = await TrustedPerson.find({
//     //   _id: { $in: condition.trustedPeople },
//     //   isVerified: true,
//     // });

//     const trustedPeople = await TrustedPerson.find({
//       _id: { $in: condition.trustedPeople },
//       status: "VERIFIED",
//     });


//     if (
//       condition.type === "INACTIVITY" &&
//       !condition.config?.inactivityDays
//     ) {
//       return res.status(400).json({
//         message: "Inactivity days not configured",
//       });
//     }



//     const accessRules = [];


//     for (const assetId of condition.linkedAssets) {
//       for (const person of trustedPeople) {
//         if (!person._id) continue;

//         console.log(person);
//         accessRules.push({
//           owner: condition.owner,
//           condition: condition._id,
//           asset: assetId,
//           trustedContact: person.userId, 
//           status: "ACTIVE",
//           activatedAt: new Date(),
//         });
//       }
//     }

//     console.log("Access Rules to be created:", accessRules);

//     if (accessRules.length > 0) {
//       await AccessRule.insertMany(accessRules);
//     }

//     condition.executionStatus = "FULFILLED";
//     condition.fulfilledAt = new Date();
//     await condition.save();

//     return res.json({
//       message: "Condition triggered successfully",
//       conditionId: condition._id,
//       accessRulesCreated: accessRules.length,
//     });

//   } catch (error) {
//     console.error("Trigger condition error:", error);
//     return res.status(500).json({
//       message: "Failed to trigger condition",
//     });
//   }
// };

