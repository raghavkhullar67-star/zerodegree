import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";

const router = express.Router();

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_live_SILj9EWrphy1Qr",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "5G8zQdZSBRKnpjal34Krz2TF",
});

// @desc    Get Razorpay Key
// @route   GET /api/payment/razorpay/config
router.get("/razorpay/config", (req, res) => {
  res.json({
    key: process.env.RAZORPAY_KEY_ID || "rzp_live_SILj9EWrphy1Qr",
  });
});

// @desc    Create Razorpay Order
// @route   POST /api/payment/razorpay/order
router.post("/razorpay/order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: Math.round(amount * 100), // amount in the smallest currency unit
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    if (!order) {
      return res.status(500).send("Some error occurred");
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Verify Razorpay Payment Signature
// @route   POST /api/payment/razorpay/verify
router.post("/razorpay/verify", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET || "5G8zQdZSBRKnpjal34Krz2TF";

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest("hex");

    if (digest !== razorpay_signature) {
      return res.status(400).json({ message: "Transaction not legit!" });
    }

    res.json({
      message: "success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
