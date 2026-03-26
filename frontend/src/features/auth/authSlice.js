import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, registerAPI, googleLoginAPI, fetchWishlist as fetchWishlistAPI, addToWishlist as addToWishlistAPI, removeFromWishlist as removeFromWishlistAPI } from "../../service/api"; 

const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  user: userFromStorage,
  isAuthenticated: !!userFromStorage,
  wishlist: [], // Array of product objects
  isLoading: false,
  isError: false,
  message: "",
};

// --- REGISTER THUNK ---
export const register = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
  try {
    const response = await registerAPI(userData); 
    // Axios response hamesha .data mein payload deta hai
    const data = response.data;
    if (data) {
      localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Registration Failed";
    return thunkAPI.rejectWithValue(message);
  }
});

// --- LOGIN THUNK ---
export const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
  try {
    const response = await loginAPI(userData);
    const data = response.data;
    if (data) {
      localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Login Failed";
    return thunkAPI.rejectWithValue(message);
  }
});

// --- GOOGLE LOGIN THUNK ---
export const googleLoginThunk = createAsyncThunk("auth/googleLogin", async (tokenData, thunkAPI) => {
  try {
    const response = await googleLoginAPI(tokenData);
    const data = response.data;
    if (data) {
      localStorage.setItem("userInfo", JSON.stringify(data));
    }
    return data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Google Login Failed";
    return thunkAPI.rejectWithValue(message);
  }
});

// --- WISHLIST THUNKS ---
export const fetchUserWishlist = createAsyncThunk("auth/fetchWishlist", async (_, thunkAPI) => {
  try {
    const data = await fetchWishlistAPI();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const toggleWishlistItem = createAsyncThunk("auth/toggleWishlist", async ({ productId, isAdded }, thunkAPI) => {
  try {
    if (isAdded) {
      await removeFromWishlistAPI(productId);
    } else {
      await addToWishlistAPI(productId);
    }
    // Re-fetch wishlist after toggle
    const data = await fetchWishlistAPI();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userInfo");
      state.user = null;
      state.isAuthenticated = false;
      state.isError = false;
      state.message = "";
    },
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(register.pending, (state) => { state.isLoading = true; })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // LOGIN
      .addCase(login.pending, (state) => { state.isLoading = true; })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // GOOGLE LOGIN
      .addCase(googleLoginThunk.pending, (state) => { state.isLoading = true; })
      .addCase(googleLoginThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(googleLoginThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // WISHLIST
      .addCase(fetchUserWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload || [];
      })
      .addCase(toggleWishlistItem.fulfilled, (state, action) => {
        state.wishlist = action.payload || [];
      });
  },
});

export const { logout, reset } = authSlice.actions;
export default authSlice.reducer;