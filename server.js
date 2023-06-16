import express from "express";
import { config } from "dotenv";
config();
import userRoutes from "./routes/user.routes.js";
import connect from "./db/connection.js";
import cookieParser from "cookie-parser";
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

// Base Route
app.get("/", (req, res) => {
  res.send("Welcome to Ecommerce App Backend Service");
});

// Routes
app.use("/api/v1/users", userRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

// App Listening
app.listen(port, () => console.log(`Listening on Port: ${port}`));
