import express from "express";
import { payment } from "../controllers/payment.controllers.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, payment);

export default router;
