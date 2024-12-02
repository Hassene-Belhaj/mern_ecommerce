import React from "react";
import { Card, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { deleteProduct } from "@/redux/slices/admin-products/productSlice";

const DashboardProductCardItem = ({
  product,
  setEditedId,
  setFormData,
  setOpenCreateProductsDialog,
}) => {
  const dispatch = useDispatch();

  const handleEditProduct = (product) => {
    setEditedId(product._id);
    setFormData(product);
    setOpenCreateProductsDialog(true);
  };

  const handleDeleteProduct = (product) => {
    dispatch(deleteProduct(product._id));
  };

  return (
    <div className="max-w-sm h-full mx-auto rounded-2xl">
      <Card>
        <img
          src={product.image || "/no-image.png"}
          className="w-full h-[350px] object-cover rounded-t-2xl "
        />
        <div className="w-full flex flex-col items-center gap-4 px-4">
          <div>
            <CardTitle>
              <h3 className="capitalize text-xl py-4">{product.title}</h3>
            </CardTitle>
          </div>
          <div className="w-full  flex justify-between items-center text-xl">
            <span>
              <h4
                className={`${
                  product?.salePrice && product.price > product?.salePrice
                    ? "line-through"
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
            <Button
              onClick={() => handleEditProduct(product)}
              className="w-1/2 bg-chart-2 hover:bg-chart-2/90"
            >
              Edit
            </Button>
            <Button
              onClick={() => handleDeleteProduct(product)}
              className="w-1/2 bg-primary"
            >
              Delete
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardProductCardItem;
