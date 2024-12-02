import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth_slice/authSlice";
import adminProductSlice from "./slices/admin-products/productSlice";
import shopProductsSlice from "./slices/shop_products_slice/shop_poducts_slice";

export const Store = configureStore({
  reducer: {
    auth: authSlice,
    adminProducts: adminProductSlice,
    shopProducts: shopProductsSlice,
  },
});
