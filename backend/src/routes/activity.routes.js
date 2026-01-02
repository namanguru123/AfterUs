import express from "express";
import ActivityLog from "../models/ActivityLog.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const logs = await ActivityLog.find({ owner: req.user.id })

    .sort({ createdAt: -1 })
    .limit(20);

  res.json(logs);
});

export default router;
