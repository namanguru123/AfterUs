import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import assetRoutes from "./routes/asset.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import activityRoutes from "./routes/activity.routes.js";
import trustedPeopleRoutes from "./routes/trustedPeople.routes.js";
import conditionRoutes from "./routes/condition.routes.js";

dotenv.config();

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests. Please try again later.",
});

app.use(limiter);
app.use(express.json({ limit: "10kb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/assets", assetRoutes);
app.use("/api/trusted-people", trustedPeopleRoutes);
app.use("/api/conditions", conditionRoutes);



app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "API is running",
    timestamp: new Date(),
  });
});

export default app;
