import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";

// @Desc        Add to Cart
// @Route       POST /api/v1/cart
// @Permission  Protected
const addToCart = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: 200,
    msg: "Add to Cart",
  });
});

// @Desc        GET Cart Items
// @Route       GET /api/v1/cart
// @Permission  Protected
const getCart = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: 200,
    msg: "Get Cart Items",
  });
});

export { addToCart, getCart };
