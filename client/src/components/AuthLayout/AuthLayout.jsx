import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-full h-full bg-black hidden md:flex justify-center items-center ">
        <h2 className="w-1/2 p-4 text-white text-3xl">Hello , Welcome</h2>
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
