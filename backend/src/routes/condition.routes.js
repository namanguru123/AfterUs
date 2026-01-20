console.log("CONDITIONS ROUTES FILE LOADED");

import express from "express";
import auth from "../middleware/auth.middleware.js";

import {
  createCondition,
  getMyConditions,
  getConditionById,
  toggleConditionStatus,
  deleteCondition,
  updateConditionAssets,
  updateConditionTrustedPeople,
  triggerCondition,
} from "../controllers/condition.controller.js";




const router = express.Router();


router.use(auth);


router.post("/:id/trigger", triggerCondition);

router.post("/", createCondition);
router.get("/", getMyConditions);
router.get("/:id", getConditionById);

router.patch("/:id/assets", updateConditionAssets);
router.patch("/:id/trusted-people", updateConditionTrustedPeople);
router.patch("/:id/toggle", toggleConditionStatus);

router.delete("/:id", deleteCondition);


// router.use(auth);


// router.post("/:id/trigger", triggerCondition);

// router.post("/", createCondition);
// router.get("/", getMyConditions);
// router.get("/:id", getConditionById);

// router.patch("/:id/toggle", toggleConditionStatus);
// router.patch("/:id/assets", updateConditionAssets);
// router.patch("/:id/trusted-people", updateConditionTrustedPeople);



// router.delete("/:id", deleteCondition);

export default router;


// router.post("/", createCondition);
// router.get("/", getMyConditions);
// router.get("/:id", getConditionById);
// router.patch("/:id/toggle", toggleConditionStatus);
// router.delete("/:id", deleteCondition);
// router.post("/:id/trigger", triggerCondition);


// router.patch("/:id/assets", updateConditionAssets);
// router.patch("/:id/trusted-people", updateConditionTrustedPeople);



// router.get("/:id", async (req, res) => {
//   try {
//     const condition = await Condition.findOne({
//       _id: req.params.id,
//       owner: req.user.id,
//       isDeleted: false,
//     })
//       .populate("linkedAssets", "title")
//       .populate("trustedPeople", "name email status");

//     if (!condition) {
//       return res.status(404).json({ message: "Condition not found" });
//     }

//     res.json(condition);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to load condition" });
//   }
// });


// export default router;
