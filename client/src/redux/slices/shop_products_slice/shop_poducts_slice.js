import { URL } from "@/App";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const initialState = {
  shopProducts: [],
  productDetails: [],
  loading: true,
};

const shopProductsSlice = createSlice({
  name: "shopProductsSlice",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchShopProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShopProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.shopProducts = action.payload;
      })
      .addCase(fetchShopProducts.rejected, (state) => {
        state.loading = false;
        state.shopProducts = [];
      })
      .addCase(getSingleProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(getSingleProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.productDetails = [];
      });
  },
});

export const fetchShopProducts = createAsyncThunk(
  "/shop/products/fetchShopProducts",
  async ({ filterParams, sortParams }) => {
    //create query
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    const { data } = await axios.get(
      `${URL}/shop/products/get_products?${query}`
    );
    return data.products;
  }
);

export const getSingleProductDetails = createAsyncThunk(
  "/shop/products/getSingleProductsDetails",
  async (id) => {
    const { data } = await axios.get(`${URL}/shop/products/get_products/${id}`);
    return data.product;
  }
);

export default shopProductsSlice.reducer;
