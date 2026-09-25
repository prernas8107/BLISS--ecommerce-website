import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { autoSeedIfEmpty } from "./controllers/productController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Connect DB + Cloudinary
await connectDB();
connectCloudinary();
await autoSeedIfEmpty();

// Middleware
app.use(express.json());
app.use(cors());

// Serve static images for local development and seeded products
app.use("/images", express.static(path.join(__dirname, "../frontend/src/assets")));

// Health & Database readiness guard
app.use("/api", (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: "Database is connecting or unavailable. Please check MongoDB Atlas Network Access (allow 0.0.0.0/0) and ensure the cluster is active."
    });
  }
  next();
});

// API Endpoints
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Root route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start server
app.listen(port, () => console.log(`🚀 Server running on Port: ${port}`));
