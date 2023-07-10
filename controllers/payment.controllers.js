import asyncHandler from "express-async-handler";
import Stripe from "stripe";
import Product from "../models/product.model.js";
import { config } from "dotenv";
config();

// const storeItems = new Map([
//   [1, { priceInCents: 10000, name: "Pdt 1" }],
//   [2, { priceInCents: 20000, name: "Pdt 2" }],
// ]);

// @Desc        Payment Controller
// @Route       POST /api/v1/create-checkout-session
// @Permission  Protected
const payment = asyncHandler(async (req, res) => {
  const payStripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
  const storeItems = await Product.find();

  const session = await payStripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: req.body.cartItems.map((item) => {
      const storeItem = storeItems.filter((stItem) => {
        // stItem._id === item._id && stItem
        if (stItem._id == item._id) return stItem;
      });
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: storeItem[0].productName,
          },
          unit_amount: storeItem[0].price * 100,
        },
        quantity: 1,
      };
    }),
    success_url: `${
      process.env.FRONTEND_URL === "development"
        ? process.env.FRONTEND_URL
        : process.env.FRONTEND_DEP
    }/success`,
    cancel_url: `${
      process.env.FRONTEND_URL === "development"
        ? process.env.FRONTEND_URL
        : process.env.FRONTEND_DEP
    }/cancel`,
  });
  res.json({ url: session.url });
});

export { payment };
