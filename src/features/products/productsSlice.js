import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts, postProduct } from "./productsAPI";


const initialState = {
    products: [],
    isLoading: false,
    postSucess: false,
    isError: false,
    error: ""
};

export const getProducts = createAsyncThunk("products/getProduct", async () => {
    const products = fetchProducts();
    return products;
});

export const addProduct = createAsyncThunk("products/addProduct", async (data) => {
    const products = postProduct(data);
    return products;
});

const productsSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        }).addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.isLoading = false;
        }).addCase(getProducts.rejected, (state, action) => {
            state.products = [];
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        })
            .addCase(addProduct.pending, (state) => {
                state.isLoading = true;
                state.postSucess = false;
                state.isError = false;
            }).addCase(addProduct.fulfilled, (state) => {
                state.postSucess = true;
                state.isLoading = false;
            }).addCase(addProduct.rejected, (state, action) => {
                state.products = [];
                state.isLoading = false;
                state.postSucess = false;
                state.isError = true;
                state.error = action.error.message;
            });


    },
});

export default productsSlice.reducer;