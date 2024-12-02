import DashboardProductCardItem from "@/components/admin-view/DashboardProductCardItem";
import UploadImage from "@/components/admin-view/upload-image/UploadImage";
import CommonForm from "@/components/in_common/form/CommonForm";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";
import {
  addProduct,
  editProduct,
  fetchProducts,
} from "@/redux/slices/admin-products/productSlice";
import { addProductFormElements } from "@/utils/config/Util";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminProducts = () => {
  const initialState = {
    image: "",
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
  };
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialState);
  const [imageBase64, setImageBase64] = useState("");
  const [editedId, setEditedId] = useState("");
  //
  const { products } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  console.log(products);

  const checkFormSubmit = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  // console.log(formData);
  // console.log(checkFormSubmit());
  // add & edit
  const onSubmitHandleProduct = async (e) => {
    e.preventDefault();
    try {
      editedId?.length !== 0
        ? dispatch(
            editProduct({
              id: editedId,
              formData,
            })
          ).then((data) => {
            if (data.payload.success) {
              setImageBase64("");
              setFormData(initialState);
              setOpenCreateProductsDialog(false);
              toast({
                title: data.payload.message,
              });
            }
          })
        : dispatch(addProduct(formData)).then((data) => {
            if (data?.payload.success) {
              setImageBase64("");
              setFormData(initialState);
              setOpenCreateProductsDialog(false);
              toast({
                title: data.payload.message,
              });
            }
          });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="w-full h-full">
      <div className="w-full flex justify-end p-4">
        <Button
          onClick={() => {
            setEditedId("");
            setFormData(initialState);
            setOpenCreateProductsDialog(true);
          }}
        >
          Add New Product
        </Button>
      </div>
      <div className="w-full h-full py-6 px-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mx-auto gap-4">
        {products &&
          products.map((product, i) => {
            return (
              <div key={i} className="w-full mx-auto px-2 md:px-4">
                <DashboardProductCardItem
                  product={product}
                  editedId={editedId}
                  setEditedId={setEditedId}
                  setFormData={setFormData}
                  setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                />
              </div>
            );
          })}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={setOpenCreateProductsDialog}
      >
        <SheetContent side="right" className="overflow-auto p-4">
          <SheetHeader>
            <SheetTitle>
              {editedId?.length !== 0 ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <SheetDescription></SheetDescription>
          <div className="py-4">
            <UploadImage
              imageBase64={imageBase64}
              setImageBase64={setImageBase64}
              isEditMode={editedId?.length !== 0}
              formData={formData}
              setFormData={setFormData}
            />
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmitHandleProduct}
              buttonText={editedId?.length !== 0 ? "Edit" : "Add"}
              checkFormSubmit={!checkFormSubmit()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminProducts;
