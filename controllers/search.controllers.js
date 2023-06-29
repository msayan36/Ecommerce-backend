import asyncHandler from "express-async-handler";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

// @Desc        Get Search
// @Route       GET /api/v1/search
// @Permission  Protected
const getSearchRes = asyncHandler(async (req, res) => {
  const searchTerm = req.query.q;

  let users = await User.find({
    $or: [
      { username: { $regex: searchTerm, $options: "i" } },
      { name: { $regex: searchTerm, $options: "i" } },
    ],
  });

  res.status(200).json({
    users,
  });
});

export { getSearchRes };
