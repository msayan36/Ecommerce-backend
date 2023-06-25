import express from "express";
import {
  addProduct,
  getProductsByUser,
} from "../controllers/product.controllers.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/add", protect, addProduct);

router.get("/:username", protect, getProductsByUser);

export default router;
