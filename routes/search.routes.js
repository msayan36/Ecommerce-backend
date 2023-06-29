import express from "express";
import { getSearchRes } from "../controllers/search.controllers.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getSearchRes);

export default router;
