import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  getSharedWithMe,
  getSharedAssetByRule,
} from "../controllers/accessRule.controller.js";

const router = express.Router();

router.use(auth);

router.get("/shared-with-me", getSharedWithMe);
router.get("/:id", getSharedAssetByRule);

export default router;
