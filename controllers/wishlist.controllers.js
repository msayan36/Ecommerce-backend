import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";

// @Desc        Add to Wishlist
// @Route       POST /api/v1/wishlist
// @Permission  Protected
const addToWishlist = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: 200,
    msg: "Add to Wishlist",
  });
});

// @Desc        GET Wishlist Items
// @Route       GET /api/v1/wishlist
// @Permission  Protected
const getWishlist = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: 200,
    msg: "Get Wishlist Items",
  });
});

export { addToWishlist, getWishlist };
