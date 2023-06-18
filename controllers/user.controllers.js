import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/user.model.js";

// @Desc        Register User
// @Route       POST /api/v1/users/register
// @Permission  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, username, profileDesc, profile_pic } =
    req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    username,
    profileDesc,
    profile_pic,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      profileDesc: user.profileDesc,
      profile_pic: user.profile_pic,
      products_count: user.products_count,
      followers: user.followers,
      following: user.following,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @Desc        Login User
// @Route       POST /api/v1/users/login
// @Permission  Public
const loginUser = asyncHandler(async (req, res) => {
  const { loginId, password } = req.body;

  let user = await User.findOne({ email: loginId });

  if (!user) user = await User.findOne({ username: loginId });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      profileDesc: user.profileDesc,
      profile_pic: user.profile_pic,
      products_count: user.products_count,
      followers: user.followers,
      following: user.following,
    });
  } else {
    res.status(401);
    throw new Error("Invalid loginId or password");
  }
});

// @Desc        Logout User
// @Route       GET /api/v1/users/logout
// @Permission  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    message: "Logged out Successfully",
  });
});

// @Desc        Get User Profile Information
// @Route       GET /api/v1/users/me
// @Permission  Protected
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      profileDesc: user.profileDesc,
      profile_pic: user.profile_pic,
      products_count: user.products_count,
      followers: user.followers,
      following: user.following,
    });
  } else {
    res.status(400);
    throw new Error("User not Found");
  }
});

// @Desc        Update User Profile
// @Route       PUT /api/v1/users/me
// @Permission  Protected
const updateMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.username = req.body.username || user.username;
    user.profileDesc = req.body.profileDesc || user.profileDesc;
    user.profile_pic = req.body.profile_pic || user.profile_pic;
    user.password = req.body.password || user.password;

    const updatedUser = await user.save();

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      profileDesc: user.profileDesc,
      profile_pic: user.profile_pic,
      products_count: user.products_count,
      followers: user.followers,
      following: user.following,
    });
  } else {
    res.status(400);
    throw new Error("User not Found");
  }
});

export { registerUser, loginUser, logoutUser, getMe, updateMe };
