import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrders,
  updateOrderStatus,
  getDashboardStats
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/dashboard').get(protect, admin, getDashboardStats);
router.route('/:id/status').put(protect, admin, updateOrderStatus);

export default router;
