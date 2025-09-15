import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    products: [],
    loading: true,
    error: null,
    page: 1,
    limit: 6,
  },
  reducers: {
    fetchProducts: (state) => {
      state.loading = true;
      state.error = null;
    },
    getProductsSuccess: (state, action) => {
      state.allProducts = action.payload.products;
      state.loading = false;
    },
    getProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;

      const startIndex = (state.page - 1) * state.limit;
      state.products = state.allProducts.slice(
        startIndex,
        startIndex + state.limit
      );
    },
  },
});

export const {
  fetchProducts,
  getProductsSuccess,
  getProductsFailure,
  setPage,
} = productsSlice.actions;

export default productsSlice.reducer;
