import express from "express";
import { addToCart, getCart } from "../controllers/cart.controllers.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").post(protect, addToCart).get(protect, getCart);

export default router;
