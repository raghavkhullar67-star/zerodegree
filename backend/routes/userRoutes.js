import express from "express";
import { 
  registerUser, loginUser, googleLogin, getAllUsers,
  getUserProfile, updateUserProfile,
  getWishlist, addToWishlist, removeFromWishlist,
  forgotPassword, resetPassword
} from "../controllers/authController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, admin, getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleLogin);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);

// Profile routes
router.route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Wishlist routes
router.route("/wishlist")
  .get(protect, getWishlist);
  
router.route("/wishlist/:id")
  .post(protect, addToWishlist)
  .delete(protect, removeFromWishlist);

export default router;