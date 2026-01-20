import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { revealSensitiveData } from "../controllers/access.controller.js";

const router = express.Router();

router.post("/reveal/:assetId", authMiddleware, revealSensitiveData);

export default router;
