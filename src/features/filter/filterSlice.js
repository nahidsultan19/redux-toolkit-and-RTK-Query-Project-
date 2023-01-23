import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stock: false,
    brands: [],
    keyword: "",
};

const fliterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        toggle: (state) => {
            state.stock = !state.stock;
        },
        toggleBrands: (state, action) => {
            if (!state.brands.includes(action.payload)) {
                state.brands.push(action.payload)
            } else {
                state.brands = state.brands.filter(brand => brand !== action.payload)
            }
        }
    },
});

export const { toggle, toggleBrands } = fliterSlice.actions;

export default fliterSlice.reducer;