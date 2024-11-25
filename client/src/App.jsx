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

const App = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
      </Route>
      <Route path="/admin" element={<Admin_view />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="features" element={<Features />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route />
      </Route>
      <Route path="/shop" element={<Shopping_view />}></Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
