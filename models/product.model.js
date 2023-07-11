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
      type: Array,
      default: ["Default Link"],
    },
    productDesc: {
      type: String,
      default: "No Description Provided",
    },
    rating: {
      type: [
        {
          value: Number,
          username: String,
          review: String,
        },
      ],
      default: [],
    },
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
