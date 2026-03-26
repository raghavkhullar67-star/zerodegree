import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import path from "path";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// 1. Environment Variables Config
dotenv.config();

// 2. Connect to MongoDB
connectDB();

const app = express();

// 3. Middlewares
app.use(cors()); // Frontend access allow karne ke liye
app.use(express.json()); // JSON body parse karne ke liye

// 4. API Routes
app.use("/products", productRoutes);
app.use("/auth", userRoutes);
app.use("/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/payment", paymentRoutes);

// Make uploads folder static
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Root Route for Testing
app.get("/", (req, res) => {
  res.send("Zero Degree API is running...");
});
// 5. Error Middlewares
app.use(notFound);
app.use(errorHandler);

// 6. Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT} 🚀`);
});