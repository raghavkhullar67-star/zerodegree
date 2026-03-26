import { createSlice, current } from "@reduxjs/toolkit";

// SAFETY UPGRADE: Safe JSON parsing
const loadCartFromStorage = () => {
  try {
    const storedCart = localStorage.getItem("cart");
    const parsed = storedCart ? JSON.parse(storedCart) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to parse cart:", error);
    localStorage.removeItem("cart");
    return [];
  }
};

// SAFETY UPGRADE: Safe Saving
const saveToLocalStorage = (items) => {
  try {
    localStorage.setItem("cart", JSON.stringify(items));
  } catch (error) {
    console.error("Save to localStorage failed:", error);
  }
};

const initialState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // 1. Normalize ID: MongoDB ka _id ho ya regular id, hum 'id' hi use karenge
      const pId = action.payload._id || action.payload.id;

      const existingItem = state.items.find((item) => item.id === pId);
      const quantityToAdd = action.payload.quantity || 1;

      if (existingItem) {
        existingItem.quantity += quantityToAdd;
      } else {
        // 2. Pure payload ko store kar rahe hain, par ID ko 'id' key par set kar rahe hain
        state.items.push({
          ...action.payload,
          id: pId,
          quantity: quantityToAdd
        });
      }

      saveToLocalStorage(current(state).items);
    },

    increaseQuantity: (state, action) => {
      // action.payload hamesha ID honi chahiye (string/number)
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        saveToLocalStorage(current(state).items);
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
        saveToLocalStorage(current(state).items);
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveToLocalStorage(current(state).items);
    },

    clearCart: (state) => {
      state.items = [];
      saveToLocalStorage([]);
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;