import { URL } from "@/App";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
  products: [],
};

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  extraReducers: (build) => {
    build
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = [...state.products, action.payload.product];
      })
      .addCase(addProduct.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.products = [];
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map((product) =>
          product._id === action.payload.product._id
            ? action.payload.product
            : product
        );
      })
      .addCase(editProduct.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        const newProducts = state.products.filter(
          (product) => product._id !== action.payload.product._id
        );
        state.products = newProducts;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const addProduct = createAsyncThunk(
  "/products/addProduct",
  async (formData) => {
    const { data } = await axios.post(`${URL}/admin/products/add`, formData);
    return data;
  }
);

export const fetchProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async () => {
    const { data } = await axios.get(`${URL}/admin/products/get`);
    return data;
  }
);

export const editProduct = createAsyncThunk(
  "/products/editProduct",
  async ({ id, formData }) => {
    const { data } = await axios.put(
      `${URL}/admin/products/edit/${id}`,
      formData
    );
    return data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteProduct",
  async (id) => {
    const { data } = await axios.delete(`${URL}/admin/products/delete/${id}`);
    return data;
  }
);
export default adminProductSlice.reducer;
