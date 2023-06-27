import express from "express";
import { getFeed, getFollowing } from "../controllers/feed.controllers.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getFeed);
router.get("/following", protect, getFollowing);

export default router;
