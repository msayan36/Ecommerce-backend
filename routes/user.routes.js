import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  updateMe,
} from "../controllers/user.controllers.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.route("/me").get(protect, getMe).put(protect, updateMe);

export default router;
