import express from "express";
import { config } from "dotenv";
config();
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import feedRoutes from "./routes/feed.routes.js";
import searchRoutes from "./routes/search.routes.js";
import followRoutes from "./routes/follow.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import connect from "./db/connection.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler, notFound } from "./middleware/error.middleware.js";

const port = process.env.PORT || 5000;

const app = express();

// DB Connection
connect();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser Middleware
app.use(cookieParser());

// Cors Middleware
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.FRONTEND_DEP],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

// Base Route
app.get("/", (req, res) => {
  res.send("Welcome to Ecommerce App Backend Service");
});

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/feed", feedRoutes);
app.use("/api/v1/search", searchRoutes);
app.use("/api/v1/follow", followRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

// App Listening
app.listen(port, () => console.log(`Listening on Port: ${port}`));
