import React from "react";
import { Button } from "./components/ui/button";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/auth/signUp";
import AuthLayout from "./components/AuthLayout/AuthLayout";
import SignIn from "./pages/auth/SignIn";
import Dashboard from "./pages/admin-view/Dashboard";
import Features from "./pages/admin-view/Features";
import Products from "./pages/admin-view/Products";
import Orders from "./pages/admin-view/Orders";
import Admin_view from "./components/admin-view/Admin_view";
import Shopping_view from "./components/shopping-view/Shopping_view";
import NotFound from "./pages/not_found/NotFound";
import Home from "./pages/shopping-view/Home";
import Listing from "./pages/shopping-view/Listing";
import Account from "./pages/shopping-view/Account";
import Checkout from "./pages/shopping-view/CheckOut";
import CheckAuth from "./components/checkAuth/CheckAuth";
import Unauth_page from "./pages/unauth-page/Unauth_page";

const App = () => {
  const isAuthenticated = false;
  const user = null;

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
            <Admin_view />
          </CheckAuth>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="features" element={<Features />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route />
      </Route>

      <Route
        path="/shop"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <Shopping_view />
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
