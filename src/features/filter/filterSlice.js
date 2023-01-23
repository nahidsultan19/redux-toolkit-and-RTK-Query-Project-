import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stock: false,
    brands: [],
    keyword: "",
};

const fliterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {},
});

export default fliterSlice.reducer;