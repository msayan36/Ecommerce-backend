import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";

// @Desc        Add to Cart
// @Route       POST /api/v1/cart
// @Permission  Protected
const addToCart = asyncHandler(async (req, res) => {
  const pdtId = req.query.product;
  const user = await User.findById(req.user._id);

  user.cart.push(pdtId);
  const newUser = await user.save();

  res.status(200).json(newUser);
});

// @Desc        GET Cart Items
// @Route       GET /api/v1/cart
// @Permission  Protected
const getCart = asyncHandler(async (req, res) => {
  const { cart } = await User.findById(req.user._id);
  const products = await Product.find({ _id: { $in: cart } });

  res.status(200).json(products);
});

export { addToCart, getCart };
