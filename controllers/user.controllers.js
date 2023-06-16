// Method       POST
// Route       /register
// Permission  Public
const registerUser = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Register Route",
  });
};

// Method       POST
// Route       /login
// Permission  Public
const loginUser = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Login Route",
  });
};

// Method       GET
// Route       /logout
// Permission  Public
const logoutUser = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logout Route",
  });
};

// Method       GET
// Route       /me
// Permission  Protected
const getMe = (req, res) => {
  res.status(200).json({
    success: true,
    message: "My Profile",
  });
};

export { registerUser, loginUser, logoutUser, getMe };
