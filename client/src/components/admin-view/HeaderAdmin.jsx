import React from "react";
import { Button } from "../ui/button";
import { LogOut, Menu } from "lucide-react";
import { useDispatch } from "react-redux";
import { Logout } from "@/redux/slices/auth_slice/authSlice";

const HeaderAdmin = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  return (
    <nav className="w-full h-16 bg-secondary">
      <div className="w-full h-full flex justify-between md:justify-end items-center px-4">
        <span
          onClick={() => setOpen(true)}
          className="flex md:hidden cursor-pointer"
        >
          <Menu />
        </span>
        <span>
          <Button
            onClick={() => dispatch(Logout())}
            className="w-full h-full flex justify-center items-center shadow-md"
          >
            <span>
              <LogOut />
            </span>
            LogOut
          </Button>
        </span>
      </div>
    </nav>
  );
};

export default HeaderAdmin;
