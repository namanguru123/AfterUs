import express from "express";
import {
  createCondition,
  getMyConditions,
  getConditionById,
  toggleConditionStatus,
  deleteCondition,
  triggerConditionManually,
} from "../controllers/condition.controller.js";

import { updateConditionAssets, updateConditionTrustedPeople } from "../controllers/condition.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(auth);

router.post("/", createCondition);
router.get("/", getMyConditions);
router.get("/:id", getConditionById);
router.patch("/:id/toggle", toggleConditionStatus);
router.post("/:id/trigger", triggerConditionManually);
router.delete("/:id", deleteCondition);


router.patch("/:id/assets", updateConditionAssets);
router.patch("/:id/trusted-people", updateConditionTrustedPeople);



router.get("/:id", async (req, res) => {
  try {
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

    res.json(condition);
  } catch (err) {
    res.status(500).json({ message: "Failed to load condition" });
  }
});


export default router;
