import express from "express";
import {
  addTrustedPerson,
  getTrustedPeople,
  deleteTrustedPerson,
verifyTrustedPersonByToken,
} from "../controllers/trustedPeople.controller.js";

import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", auth, addTrustedPerson);
router.get("/", auth, getTrustedPeople);
router.delete("/:id", auth, deleteTrustedPerson);
router.get("/verify", verifyTrustedPersonByToken);


export default router;
