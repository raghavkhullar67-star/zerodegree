import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview
} from "../controllers/productControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// Routes setup
router.get("/", getProducts);            // Saare products ke liye
router.post("/", protect, admin, createProduct);         // Naya product add karne ke liye
router.get("/:id", getProductById);      // Ek specific product ke liye
router.put("/:id", protect, admin, updateProduct);       // Product update karne ke liye
router.delete("/:id", protect, admin, deleteProduct);    // Product delete karne ke liye
router.post("/:id/reviews", protect, createProductReview); // Review add karne ke liye

export default router;