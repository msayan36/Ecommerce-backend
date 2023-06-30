import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";

// @Desc        Get Suggested User
// @Route       GET /api/v1/feed/suggested
// @Permission  Protected
const followUser = asyncHandler(async (req, res) => {
  const currUser = await User.find({ username: req.user.username });
  const followUser = await User.find({ username: req.query.username });

  if (currUser && followUser) {
    followUser[0].followers.push(currUser[0]._id);
    currUser[0].following.push(followUser[0]._id);

    const updatedCurrUser = await currUser[0].save();
    const updatedFollowUser = await followUser[0].save();
    res.status(200).json({ msg: "Followed Successfully" });
  } else {
    res.status(400);
    throw new Error("User not Found");
  }
});

export { followUser };
