import axios from 'axios';

// 1. Base API setup (Base URL ko yahan set karein)
const API = axios.create({ baseURL: 'http://127.0.0.1:5000' });

// 2. Interceptor: Har request se pehle ye check karega ki token hai ya nahi
API.interceptors.request.use((req) => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    const parsedUser = JSON.parse(userInfo);
    if (parsedUser.token) {
      req.headers.Authorization = `Bearer ${parsedUser.token}`;
    }
  }
  return req;
});

// ==========================
//        AUTH API
// ==========================
// Agar aap authSlice mein API ko directly yahan se call karna chahein:
export const loginAPI = (userData) => API.post('/auth/login', userData);
export const registerAPI = (userData) => API.post('/auth/register', userData);
export const googleLoginAPI = (tokenData) => API.post('/auth/google', tokenData);
export const forgotPasswordAPI = (emailData) => API.post('/auth/forgotpassword', emailData);
export const resetPasswordAPI = (token, passwordData) => API.put(`/auth/resetpassword/${token}`, passwordData);

// ==========================
//      ADMIN USER API
// ==========================
export const fetchAllUsers = async () => {
    try {
        const response = await API.get('/auth');
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

// ==========================
//      PRODUCTS API
// ==========================
export const fetchProducts = async (params = {}) => {
  try {
    const { keyword = '', category = '', price_gte = '', price_lte = '', sort = '', page = 1, limit = 10 } = params;
    
    // Clean params logic
    const queryObj = {};
    if (keyword) queryObj.keyword = keyword;
    if (category && category !== "All") queryObj.category = category;
    if (price_gte) queryObj.price_gte = price_gte;
    if (price_lte) queryObj.price_lte = price_lte;
    if (sort) queryObj.sort = sort;
    if (page) queryObj.page = page;
    if (limit) queryObj.limit = limit;

    const queryString = new URLSearchParams(queryObj).toString();

    const response = await API.get(`/products?${queryString}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await API.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await API.post('/products', productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (id, updatedData) => {
  try {
    const response = await API.put(`/products/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await API.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// ==========================
//        ORDERS API
// ==========================
export const createOrder = async (orderData) => {
  try {
    const response = await API.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const fetchMyOrders = async () => {
  try {
    const response = await API.get('/orders/myorders');
    return response.data;
  } catch (error) {
    console.error("Error fetching my orders:", error);
    throw error;
  }
};

export const fetchAllOrders = async () => {
  try {
    const response = await API.get('/orders');
    return response.data;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
};

export const updateOrderStatus = async (id, status) => {
  try {
    const response = await API.put(`/orders/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

export const fetchDashboardStats = async () => {
  try {
    const response = await API.get('/orders/dashboard');
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
};

// ==========================
//      PROFILE & WISHLIST
// ==========================
export const getUserProfile = async () => {
  try {
    const response = await API.get('/auth/profile');
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const response = await API.put('/auth/profile', userData);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const fetchWishlist = async () => {
  try {
    const response = await API.get('/auth/wishlist');
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
};

export const addToWishlist = async (productId) => {
  try {
    const response = await API.post(`/auth/wishlist/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
};

export const removeFromWishlist = async (productId) => {
  try {
    const response = await API.delete(`/auth/wishlist/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    throw error;
  }
};

// ==========================
//        REVIEWS API
// ==========================
export const createProductReview = async (productId, reviewData) => {
  try {
    const response = await API.post(`/products/${productId}/reviews`, reviewData);
    return response.data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

// ==========================
//        UPLOAD API
// ==========================
export const uploadFile = async (fileData) => {
  try {
    const response = await API.post('/api/upload', fileData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Server returns the image path as a string
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// ==========================
//      PAYMENT API (RAZORPAY)
// ==========================
export const getRazorpayConfig = async () => {
  try {
    const response = await API.get('/api/payment/razorpay/config');
    return response.data;
  } catch (error) {
    console.error("Error fetching Razorpay config:", error);
    throw error;
  }
};

export const createRazorpayOrder = async (amount) => {
  try {
    const response = await API.post('/api/payment/razorpay/order', { amount });
    return response.data;
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw error;
  }
};

export const verifyRazorpayPayment = async (paymentData) => {
  try {
    const response = await API.post('/api/payment/razorpay/verify', paymentData);
    return response.data;
  } catch (error) {
    console.error("Error verifying Razorpay payment:", error);
    throw error;
  }
};