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

// @Desc        GET Remove All Cart Items
// @Route       GET /api/v1/cart/remove-fullCart
// @Permission  Protected
const removeAllCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.cart = [];
  const newUser = await user.save();

  res.status(200).json(newUser);
});

// @Desc        POST Remove Single Cart Item by Id
// @Route       POST /api/v1/cart/remove-singleCartItem
// @Permission  Protected
const removeSingleCartItem = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const pdtId = req.body.pdtId;

  const finalCart = user.cart.filter((item) => item != pdtId);
  user.cart = finalCart;
  const newUser = await user.save();

  res.status(200).json(newUser);
});

export { addToCart, getCart, removeAllCart, removeSingleCartItem };
