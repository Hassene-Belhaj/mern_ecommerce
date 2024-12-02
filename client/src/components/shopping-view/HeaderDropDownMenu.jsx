import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { LogOut, User2Icon, UserCog } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Logout } from "@/redux/slices/auth_slice/authSlice";
import { Avatar, AvatarFallback } from "../ui/avatar";

const HeaderDropDownMenu = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(Logout());
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarFallback className="bg-chart-3 text-white cursor-pointer">
              HB
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 py-4">
          <DropdownMenuLabel className="text-center">
            <h3>
              Logged in as{" "}
              <span className="text-chart-2 capitalize">{user.username}</span>
            </h3>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              to="/shop/account"
              className="w-full flex gap-2 justify-center items-center"
            >
              <UserCog />
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleLogOut}>
            <Button className="w-full text-center">
              <LogOut />
              LogOut
            </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default HeaderDropDownMenu;
