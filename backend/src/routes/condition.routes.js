import express from "express";
import {
  createCondition,
  getMyConditions,
  toggleConditionStatus,
  deleteCondition,
  triggerConditionManually,
} from "../controllers/condition.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(auth);

router.post("/", createCondition);
router.get("/", getMyConditions);
router.patch("/:id/toggle", toggleConditionStatus);
router.post("/:id/trigger", triggerConditionManually);
router.delete("/:id", deleteCondition);

export default router;
