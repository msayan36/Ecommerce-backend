import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";

// @Desc        Add to Wishlist
// @Route       POST /api/v1/wishlist
// @Permission  Protected
const addToWishlist = asyncHandler(async (req, res) => {
  const pdtId = req.query.product;
  const user = await User.findById(req.user._id);

  user.wishlist.push(pdtId);
  const newUser = await user.save();

  res.status(200).json(newUser);
});

// @Desc        GET Wishlist Items
// @Route       GET /api/v1/wishlist
// @Permission  Protected
const getWishlist = asyncHandler(async (req, res) => {
  const { wishlist } = await User.findById(req.user._id);
  const products = await Product.find({ _id: { $in: wishlist } });

  res.status(200).json(products);
});

// @Desc        POST Remove Single Wishlist Item by Id
// @Route       POST /api/v1/wishlist/remove-singleWishlistItem
// @Permission  Protected

const removeSingleWishlistItem = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const pdtId = req.body.pdtId;

  const finalWishlist = user.wishlist.filter((item) => item != pdtId);
  user.wishlist = finalWishlist;
  const newUser = await user.save();

  res.status(200).json(newUser);
});

export { addToWishlist, getWishlist, removeSingleWishlistItem };
