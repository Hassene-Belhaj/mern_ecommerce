import React from "react";
import { Link, Outlet } from "react-router-dom";

const Admin_view = () => {
  return (
    <div className="capitalize">
      <div>header component</div>
      <div>admin sidebar</div>
      <Outlet />
      <div className="py-8 w-full flex flex-col justify-center items-center">
        <Link to={"/admin/dashboard"} className="underline">
          dashboard
        </Link>
        <Link to={"/admin/features"} className="underline">
          Features
        </Link>
        <Link to={"/admin/orders"} className="underline">
          orders
        </Link>
        <Link to={"/admin/products"} className="underline">
          products
        </Link>
      </div>
    </div>
  );
};

export default Admin_view;
