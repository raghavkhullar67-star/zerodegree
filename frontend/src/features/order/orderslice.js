import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMyOrders, updateOrderStatus } from "../../service/api";

// Fetch User Orders Thunk
export const getMyOrdersThunk = createAsyncThunk("order/getMyOrders", async (_, thunkAPI) => {
  try {
    return await fetchMyOrders();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch orders");
  }
});

// Update Order Status Thunk (Cancel)
export const cancelOrderThunk = createAsyncThunk("order/cancelOrder", async (id, thunkAPI) => {
  try {
    return await updateOrderStatus(id, "Cancelled");
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to cancel order");
  }
});

const initialState = {
  orders: [],
  isLoading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyOrdersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload; 
      })
      .addCase(getMyOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(cancelOrderThunk.fulfilled, (state, action) => {
         const updated = action.payload;
         const orderIndex = state.orders.findIndex(o => o._id === updated._id);
         if (orderIndex >= 0) {
           state.orders[orderIndex] = updated;
         }
      });
  },
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;