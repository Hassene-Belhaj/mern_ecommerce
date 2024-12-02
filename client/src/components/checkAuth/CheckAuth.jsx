import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const { pathname } = useLocation();

  if (!isAuthenticated && !pathname.startsWith("/auth/sign")) {
    return <Navigate to="/auth/signin" />;
  }
  if (isAuthenticated && pathname.startsWith("/auth/sign")) {
    if (user?.role === "admin") {
      return <Navigate to={"/admin/dashboard"} />;
    } else {
      return <Navigate to={"/shop/home"} />;
    }
  }
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    pathname.startsWith("/admin")
  ) {
    return <Navigate to={"/unauth-page"} />;
  }
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    pathname.startsWith("/shop")
  ) {
    return <Navigate to={"/admin/dashboard"} />;
  }
  return <>{children}</>;
};

export default CheckAuth;
