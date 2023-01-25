import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteProduct, fetchProducts, postProduct } from "./productsAPI";


const initialState = {
    products: [],
    isLoading: false,
    postSucess: false,
    deleteSucess: false,
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
export const removeProduct = createAsyncThunk("products/removeProduct", async (id, thunkAPI) => {
    const products = await deleteProduct(id);
    thunkAPI.dispatch(removeFromList(id));
    return products;
});

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        togglePostSucess: (state) => {
            state.postSucess = false;
        },
        toggleDeleteSucess: (state) => {
            state.deleteSucess = false;
        },
        removeFromList: (state, action) => {
            state.products = state.products.filter((product) => product._id !== action.payload)
        }
    },
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
            })
            .addCase(removeProduct.pending, (state) => {
                state.isLoading = true;
                state.deleteSucess = false;
                state.isError = false;
            }).addCase(removeProduct.fulfilled, (state) => {
                state.deleteSucess = true;
                state.isLoading = false;
            }).addCase(removeProduct.rejected, (state, action) => {
                state.products = [];
                state.isLoading = false;
                state.deleteSucess = false;
                state.isError = true;
                state.error = action.error.message;
            });


    },
});

export const { togglePostSucess, toggleDeleteSucess, removeFromList } = productsSlice.actions;
export default productsSlice.reducer;