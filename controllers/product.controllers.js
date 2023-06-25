import asyncHandler from "express-async-handler";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

// @Desc        Add Product
// @Route       POST /api/v1/products/add
// @Permission  Protected
const addProduct = asyncHandler(async (req, res) => {
  const { productName, productDesc, price, productImg } = req.body;

  // const token = req.cookies.jwt;

  // const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const { username, _id } = await User.findById(req.user._id);

  const product = await Product.create({
    user: _id,
    username,
    productName,
    productDesc,
    price,
    productImg,
  });

  if (product) {
    res.status(201).json(product);
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @Desc        Get Products By User
// @Route       PUT /api/v1/products/:username
// @Permission  Protected
const getProductsByUser = asyncHandler(async (req, res) => {
  const { username } = req.params;

  const products = await Product.find({ username });
  res.status(200).json(products);
});

export { addProduct, getProductsByUser };
