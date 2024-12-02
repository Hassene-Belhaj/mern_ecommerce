import React, { useEffect } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { useDispatch } from "react-redux";
import { getSingleProductDetails } from "@/redux/slices/shop_products_slice/shop_poducts_slice";

const Shop_SingleProduct = ({
  id,
  openDialogSingleProductDetails,
  setOpenDialogSingleProductDetails,
}) => {
  const dispatch = useDispatch();
  //   console.log(openDialogSingleProductDetails);

  const fetchSingleProductDetails = (id) => {
    dispatch(getSingleProductDetails());
  };

  //   useEffect(() => {
  //     if (id) {
  //       fetchSingleProductDetails(id);
  //     }
  //   }, [id]);

  return (
    <Dialog open={openDialogSingleProductDetails} children>
      <DialogContent>
        <div className="grid grid-cols-2"> Lorem ipsum dolor sit amet.</div>
      </DialogContent>
    </Dialog>
  );
};

export default Shop_SingleProduct;
