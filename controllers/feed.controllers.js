import asyncHandler from "express-async-handler";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";

// @Desc        Get Feed
// @Route       GET /api/v1/feed
// @Permission  Protected
const getFeed = asyncHandler(async (req, res) => {
  let excludedIds = [req.user._id];

  let products = await Product.find({
    user: {
      $nin: excludedIds,
    },
  }).sort({ createdAt: -1 });

  // products = products.map((product) => {
  //   if (product.username !== req.user.username) return product;
  // });

  res.status(200).json({
    products,
  });
});

// @Desc        Get Following
// @Route       GET /api/v1/feed/following
// @Permission  Protected
const getFollowing = asyncHandler(async (req, res) => {
  // console.log(req.user.following);

  let profile_arr = await Promise.all(
    req.user.following.map(async (profile) => {
      let userDetails = await User.findById(profile).select("-password");
      return userDetails;
    })
  );

  res.status(200).json({
    profile_arr,
  });
});

export { getFeed, getFollowing };
