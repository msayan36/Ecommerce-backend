import asyncHandler from "express-async-handler";
import cloudinary from "cloudinary";
import { config } from "dotenv";
config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// @Desc        Image Upload Controller
// @Route       POST /api/v1/imageUpload
// @Permission  Protected
const imageUpload = asyncHandler(async (req, res) => {
  const fileStr = req.body.data;
  const uploadedResponse = await cloudinary.uploader.upload(fileStr);
  console.log(uploadedResponse);

  res.status(200).json({
    msg: "Message Uploaded Successfully",
    url: uploadedResponse.secure_url,
  });
});

export { imageUpload };
