import React, { useState } from "react";
import HeaderShopping from "./HeaderShopping";
import Listing from "@/pages/shopping-view/Listing";

const shoppingLayout = () => {
  return (
    <div>
      <HeaderShopping />
      <Listing />
    </div>
  );
};

export default shoppingLayout;
