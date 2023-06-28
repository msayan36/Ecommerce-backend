import express from "express";
import {
  getFeed,
  getFollowing,
  getSuggested,
} from "../controllers/feed.controllers.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getFeed);
router.get("/following", protect, getFollowing);
router.get("/suggested", protect, getSuggested);

export default router;
