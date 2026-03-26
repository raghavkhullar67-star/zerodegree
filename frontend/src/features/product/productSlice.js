import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        // BACKEND UPGRADE: Jab API call start ho, toh loading ON karne ke liye
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        
        // BACKEND UPGRADE: Agar API fail ho jaye, toh error show karne ke liye
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false; // Error aane par loading stop kardo
        },

        // EXISTING LOGIC UPGRADED
        setProducts: (state, action) => {
            state.products = action.payload;
            state.loading = false; // Products set hote hi loading automatically OFF
            state.error = null;    // Purane errors clean kar do
        },
        
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },
        
        removeProduct: (state, action) => {
            state.products = state.products.filter(
                (product) => product.id !== action.payload
            );
        },
    },
});

export const { 
    setProducts, 
    addProduct, 
    removeProduct, 
    setLoading, 
    setError 
} = productSlice.actions;

export default productSlice.reducer;