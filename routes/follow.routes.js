import express from "express";
import { followUser } from "../controllers/follow.controllers.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, followUser);

export default router;
