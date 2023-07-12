import express from "express";
import { imageUpload } from "../controllers/imageUpload.controllers.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, imageUpload);

export default router;
