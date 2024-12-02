import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/auth/signUp";
import AuthLayout from "./components/AuthLayout/AuthLayout";
import SignIn from "./pages/auth/SignIn";
import Features from "./pages/admin-view/Features";
import AdminProducts from "./pages/admin-view/AdminProducts";
import Orders from "./pages/admin-view/Orders";
import ShoppingLayout from "./components/shopping-view/shoppingLayout";
import NotFound from "./pages/not_found/NotFound";
import Home from "./pages/shopping-view/Home";
import Listing from "./pages/shopping-view/Listing";
import Account from "./pages/shopping-view/Account";
import Checkout from "./pages/shopping-view/CheckOut";
import CheckAuth from "./components/checkAuth/CheckAuth";
import Unauth_page from "./pages/unauth-page/Unauth_page";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./redux/slices/auth_slice/authSlice";
import DashboardLayout from "./components/admin-view/DashboardLayout";
import Dashboard from "./pages/admin-view/Dashboard";

export const URL = import.meta.env.VITE_REACT_BASEURL;

const App = () => {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading)
    return (
      <div>
        <h1>...loading</h1>
      </div>
    );
  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }
      >
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
      </Route>

      <Route
        path="/admin"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <DashboardLayout />
          </CheckAuth>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="features" element={<Features />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<AdminProducts />} />
        <Route />
      </Route>

      <Route
        path="/shop"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }
      >
        <Route path="home" element={<Home />} />
        <Route path="listing" element={<Listing />} />
        <Route path="account" element={<Account />} />
        <Route path="Checkout" element={<Checkout />} />
      </Route>
      <Route path="/unauth-page" element={<Unauth_page />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
