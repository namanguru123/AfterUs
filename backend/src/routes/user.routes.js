import express from "express";
import { getUserDetails, deleteUser } from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// GET current logged-in user
router.get("/me", authMiddleware, getUserDetails);

// DELETE current logged-in user
router.delete("/me", authMiddleware, deleteUser);


export default router;
