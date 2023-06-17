import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/user.model.js";

// Method       POST
// Route       /register
// Permission  Public
const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Register Route",
  });
});

// Method       POST
// Route       /login
// Permission  Public
const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Login Route",
  });
});

// Method       GET
// Route       /logout
// Permission  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logout Route",
  });
});

// Method       GET
// Route       /me
// Permission  Protected
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "My Profile",
  });
});

export { registerUser, loginUser, logoutUser, getMe };
