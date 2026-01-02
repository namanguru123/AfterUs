import express from "express";
import auth from "../middleware/auth.middleware.js";

import DigitalAsset from "../models/DigitalAsset.js";
import TrustedPerson from "../models/TrustedPerson.js";
import Condition from "../models/Condition.js";

const router = express.Router();

router.get("/summary", auth, async (req, res) => {
  try {
    const userId = req.user.id;

    const [assetsCount, peopleCount, conditionsCount] =
      await Promise.all([
        DigitalAsset.countDocuments({
          owner: userId,
          isDeleted: false,
        }),
        TrustedPerson.countDocuments({ owner: userId }),
        Condition.countDocuments({
          owner: userId,
          active: true,
        }),
      ]);

    res.json({
      assets: assetsCount,
      trustedPeople: peopleCount,
      activeConditions: conditionsCount,
    });
  } catch (error) {
    console.error("Dashboard summary error:", error);
    res.status(500).json({ message: "Failed to load dashboard summary" });
  }
});

export default router;
