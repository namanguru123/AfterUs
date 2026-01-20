// import express from "express";
// import ActivityLog from "../models/ActivityLog.js";
// import auth from "../middleware/auth.middleware.js";

// const router = express.Router();

// router.get("/", auth, async (req, res) => {
//   const logs = await ActivityLog.find({ owner: req.user.id })

//     .sort({ createdAt: -1 })
//     .limit(20);

//   res.json(logs);
// });

// export default router;


import express from "express";
import auth from "../middleware/auth.middleware.js";
import { getMyActivityLogs } from "../controllers/activityLog.controller.js";

const router = express.Router();

router.get("/", auth, getMyActivityLogs);

export default router;
