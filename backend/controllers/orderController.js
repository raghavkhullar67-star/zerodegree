import Order from "../models/Order.js";
import Product from "../models/Products.js";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

// @desc    Create new order
// @route   POST /orders
export const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      date,
      status
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      totalPrice,
      date,
      status: status || 'Processing'
    });

    const createdOrder = await order.save();

    // Deduct stock for each item
    for (const item of orderItems) {
      if (item.product) {
        const product = await Product.findById(item.product);
        if (product) {
          product.stock = product.stock - item.quantity;
          // Ensure stock doesn't go below 0 purely as a safeguard
          if (product.stock < 0) product.stock = 0;
          await product.save();
        }
      }
    }

    // Send order confirmation email
    const user = await User.findById(req.user._id);
    if (user && user.email) {
      await sendEmail({
        email: user.email,
        subject: `Order Confirmation - Zero Degree`,
        message: `Thank you for your order, ${user.name}!\n\nYour order ID is ${createdOrder._id}.\nTotal Amount: ₹${totalPrice}\n\nWe will notify you once your items are shipped.`,
      });
    }

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /orders/myorders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders
// @route   GET /orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = req.body.status || order.status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Admin Dashboard Stats
// @route   GET /orders/dashboard
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    const totalClients = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    
    // Calculate total revenue
    const orders = await Order.find({});
    const totalRevenue = orders.reduce((acc, item) => acc + item.totalPrice, 0);

    // Get 5 recent orders populated with user for the table
    const recentOrders = await Order.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalClients,
      totalOrders,
      totalProducts,
      totalRevenue,
      recentOrders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
