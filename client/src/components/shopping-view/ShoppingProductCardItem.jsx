import React, { useEffect } from "react";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useDispatch } from "react-redux";
import { getSingleProductDetails } from "@/redux/slices/shop_products_slice/shop_poducts_slice";

const ShoppingProductCardItem = ({ product, setProductId }) => {
  const Percent = 100 - (product.salePrice * 100) / product.price;
  const dispatch = useDispatch();

  const handleIdSingleProduct = (id) => {
    setProductId(id);
    dispatch(getSingleProductDetails(id));
  };

  return (
    <div className="max-w-sm h-full mx-auto rounded-2xl">
      <Card>
        <div
          onClick={() => handleIdSingleProduct(product._id)}
          className="rounded-t-2xl overflow-hidden relative cursor-pointer"
        >
          <img
            src={product.image || "/no-image.png"}
            className="w-full h-[350px] object-cover"
          />

          {product?.salePrice !== 0 && (
            <Badge className="absolute top-3 right-3 h-8 w-18 rounded-full bg-chart-3 flex justify-center items-center">
              {Percent.toFixed(0)}%
            </Badge>
          )}
        </div>
        <div className="w-full flex flex-col items-center gap-4 px-4">
          <div>
            <CardTitle>
              <h3 className="capitalize text-xl py-4">{product.title}</h3>
            </CardTitle>
          </div>
          <div className="w-full flex justify-between items-center text-primary/80">
            <h4>{product.category}</h4>
            <h4>{product.brand}</h4>
          </div>
          <div className="w-full  flex justify-between items-center text-xl">
            <span>
              <h4
                className={`${
                  product?.salePrice && product.price > product?.salePrice
                    ? "line-through text-red-600"
                    : null
                } `}
              >
                ${product.price}
              </h4>
            </span>
            <span>
              {product?.salePrice ? <h4>${product.salePrice}</h4> : null}
            </span>
          </div>
          <div className="w-full flex justify-between items-center gap-4 pt-2 pb-6">
            <Button className="w-full h-12 bg-chart-3 hover:bg-chart-3/90">
              Add To Cart
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ShoppingProductCardItem;
