import React from "react";
import ShoppingProductCardItem from "./ShoppingProductCardItem";

const ShoppingProduct = ({ shopProducts, setProductId }) => {
  return (
    <div className="w-full py-8 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {shopProducts.map((product, i) => {
        return (
          <div key={i}>
            {
              <ShoppingProductCardItem
                product={product}
                setProductId={setProductId}
              />
            }
          </div>
        );
      })}
    </div>
  );
};

export default ShoppingProduct;
