import { Menu, ShoppingCart } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";

import { useSelector } from "react-redux";
import HeaderDropDownMenu from "./HeaderDropDownMenu";

const navLinks = [
  { name: "Home", path: "/shop" },
  { name: "Men", path: "/shop/listing" },
  { name: "Women", path: "/shop/listing" },
  { name: "Kids", path: "/shop/listing" },
  { name: "Footwear", path: "/shop/listing" },
  { name: "Accessoires", path: "/shop/listing" },
];

const HeaderShopping = () => {
  const [openDialogShop, setOpenDialogShop] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  return (
    <nav className="fixed top-0 left-0 h-16 w-full border-b z-50">
      <div className="w-full h-full px-4 flex justify-between items-center bg-secondary">
        <span className="w-auto flex justify-center items-center gap-2">
          <h1 className="text-xl text-chart-2 font-semibold ">Logo</h1>
        </span>
        <div className="hidden md:block">
          <NavItems />
        </div>
        <div>
          <div className="w-full h-full hidden md:flex justify-center items-center gap-4">
            <div className="w-10 h-10 flex justify-center items-center relative">
              <ShoppingCart />
              <span className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 bg-chart-2 text-white w-6 h-6 flex justify-center items-center text-[14px] rounded-full">
                10
              </span>
            </div>
            <div>
              <HeaderDropDownMenu user={user} />
            </div>
          </div>
        </div>
        <Sheet open={openDialogShop} onOpenChange={setOpenDialogShop}>
          <SheetTrigger asChild>
            <Button
              className="w-8 h-8 flex md:hidden justify-center items-center "
              variant="outline"
              onClick={() => setOpenDialogShop(!openDialogShop)}
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full">
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>
            <SheetDescription></SheetDescription>
            <div className="py-8">
              <NavItems position={true} setOpenDialogShop={setOpenDialogShop} />
            </div>{" "}
            <div className="w-10 h-10 flex justify-center items-center relative">
              <ShoppingCart />
              <span className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 bg-chart-2 text-white w-6 h-6 flex justify-center items-center text-[14px] rounded-full">
                10
              </span>
            </div>
            <div>
              <HeaderDropDownMenu user={user} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
export default HeaderShopping;

const NavItems = ({ position, setOpenDialogShop }) => {
  return (
    <ul
      className={`${
        position ? "flex-col items-start" : "flex-row items-center"
      } w-full flex justify-center font-medium`}
    >
      {navLinks.map((item, i) => {
        return (
          <Link
            key={i}
            to={item.path}
            onClick={position ? () => setOpenDialogShop(false) : null}
            className="w-full hover:hover:bg-secondary rounded-lg"
          >
            <li className="py-6 pl-4">{item.name}</li>
          </Link>
        );
      })}
    </ul>
  );
};
