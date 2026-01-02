import jwt from "jsonwebtoken";
import env from "../config/env.js";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, env.JWT_SECRET);


    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    user.lastActiveAt = new Date();
    await user.save({ validateBeforeSave: false });

    req.user = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      lastActiveAt: user.lastActiveAt,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
