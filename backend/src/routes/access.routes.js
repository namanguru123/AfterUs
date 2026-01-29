import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { revealSensitiveData, downloadAssetForTrustedPerson } from "../controllers/access.controller.js";

const router = express.Router();

router.post("/reveal/:assetId", authMiddleware, revealSensitiveData);
router.get("/download/:assetId", authMiddleware, downloadAssetForTrustedPerson);

export default router;
