import express from "express";
import {
  addToWishlist,
  getWishlist,
} from "../controllers/wishlist.controllers.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").post(protect, addToWishlist).get(protect, getWishlist);

export default router;
