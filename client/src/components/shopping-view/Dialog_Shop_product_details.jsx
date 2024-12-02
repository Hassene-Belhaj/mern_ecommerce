import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";

const dialog_Shop_product_details = ({
  openDialogProductDetails,
  setOpenDialogProductDetails,
  productDetails,
}) => {
  console.log(productDetails);
  return (
    <Dialog
      open={openDialogProductDetails}
      onOpenChange={setOpenDialogProductDetails}
    >
      <DialogContent>
        <div className="w-full h-full flex justify-center gap-4">
          <div
            className="w-full h-full flex justify-center items-start"
            alt={productDetails.title}
          >
            <img
              src={productDetails.image}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="w-full h-full">
            <DialogTitle>{productDetails.title}</DialogTitle>
            <DialogDescription>{productDetails.description}</DialogDescription>
            <div className="w-full flex flex-col gap-4">
              <div className="w-full flex justify-between items-center">
                <h3
                  className={`${
                    productDetails.salePrice
                      ? "line-through text-red-600"
                      : null
                  } py-8 text-2xl`}
                >
                  ${productDetails.price}
                </h3>
                {productDetails.salePrice ? (
                  <h3 className="text-2xl">${productDetails.salePrice}</h3>
                ) : null}
              </div>
            </div>
            <Button className="w-full bg-chart-3">Add to Cart</Button>
            <div className="py-8">
              <h3 className="py-2 font-semibold">Reviews</h3>
              <div className="py-2 flex  justify-start items-center gap-4">
                <div>
                  <Avatar>
                    <AvatarFallback className="bg-chart-3 text-secondary">
                      HB
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((item, i) => {
                        return <StarIcon size={15} fill="black" key={i} />;
                      })}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                </div>
              </div>
              <div className="py-2 flex justify-start items-center gap-4">
                <div>
                  <Avatar>
                    <AvatarFallback className="bg-chart-3 text-secondary">
                      {" "}
                      HB
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((item, i) => {
                        return <StarIcon size={15} fill="black" key={i} />;
                      })}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Lorem ipsum dolor sit amet consectetur.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default dialog_Shop_product_details;
