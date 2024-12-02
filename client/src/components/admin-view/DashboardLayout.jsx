import React, { useState } from "react";
import HeaderAdmin from "./HeaderAdmin";
import { Outlet } from "react-router-dom";
import SideBarAdmin from "./SideBarAdmin";

const DashboardLayout = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <div className="w-full flex">
      <SideBarAdmin open={openSideBar} setOpen={setOpenSideBar} />
      <div className="flex flex-col w-full">
        <HeaderAdmin open={setOpenSideBar} setOpen={setOpenSideBar} />
        <div className="mt-10 pl-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
