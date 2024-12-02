import { ChartNoAxesCombined } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { BadgeCheck, LayoutDashboard, ShoppingBasket } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

export const SideBarLinks = [
  {
    id: "dashboard",
    item: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    item: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    item: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];

const SideBarAdmin = ({ open, setOpen }) => {
  return (
    <>
      <Sheet
        className="w-full block md:hidden"
        open={open}
        onOpenChange={setOpen}
      >
        <SheetContent side="left" className="w-64">
          <SheetHeader>
            <SheetTitle className="w-full h-16 ">
              <span className="w-full h-16 flex justify-start items-center gap-2">
                <ChartNoAxesCombined size={40} className="text-primary" />
                Admin Panel
              </span>
            </SheetTitle>
          </SheetHeader>
          <SheetDescription></SheetDescription>
          <div className="w-full">
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden md:flex flex-col w-64 h-screen border-r">
        <Link to={"/admin/dashboard"}>
          <div className="h-16 pl-2">
            <span className="w-full h-full flex justify-start items-center gap-2">
              <ChartNoAxesCombined size={40} className="text-primary" />
              <h1 className="text-xl mt-2 font-semibold">Admin Panel</h1>
            </span>
          </div>
        </Link>
        <div className="h-full flex flex-col">
          <MenuItems />
        </div>
      </aside>
    </>
  );
};

export default SideBarAdmin;

const MenuItems = ({ setOpen }) => {
  return (
    <>
      {SideBarLinks.map((element) => {
        return (
          <Link
            onClick={setOpen ? () => setOpen(false) : null}
            key={element.id}
            to={element.path}
            className="h-24 flex justify-start items-center pl-4 text-foreground hover:bg-muted"
          >
            <span className="flex items-center gap-2">
              {element.icon}
              <h2>{element.item}</h2>
            </span>
          </Link>
        );
      })}
    </>
  );
};
