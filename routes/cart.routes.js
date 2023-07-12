import express from "express";
import {
  addToCart,
  getCart,
  removeAllCart,
  removeSingleCartItem,
} from "../controllers/cart.controllers.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/").post(protect, addToCart).get(protect, getCart);
router.get("/remove-fullCart", protect, removeAllCart);
router.post("/remove-singleCartItem", protect, removeSingleCartItem);

export default router;
