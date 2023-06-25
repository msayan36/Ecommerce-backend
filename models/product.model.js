import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    username: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productImg: {
      type: String,
      default: "Default Pic Link",
    },
    productDesc: {
      type: String,
      default: "No Description Provided",
    },
    rating: [
      {
        value: Number,
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
      },
    ],
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
