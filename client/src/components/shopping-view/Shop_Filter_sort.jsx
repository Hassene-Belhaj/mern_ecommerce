import { ArrowUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProduct from "./ShoppingProduct";
import { useSearchParams } from "react-router-dom";
import { fetchShopProducts } from "../../redux/slices/shop_products_slice/shop_poducts_slice";
import Dialog_Shop_product_details from "./Dialog_Shop_product_details";

const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

const Shop_Filter_sort = () => {
  const { shopProducts, productDetails } = useSelector(
    (state) => state.shopProducts
  );

  const dispatch = useDispatch();
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [productId, setProductId] = useState("");
  const [openDialogProductDetails, setOpenDialogProductDetails] =
    useState(false);

  const handleCheckBox = (sectionName, optionLabel) => {
    let copyFilter = { ...filters };
    const currentIndexOfSection = Object.keys(copyFilter).indexOf(sectionName);
    if (currentIndexOfSection === -1) {
      copyFilter = {
        ...copyFilter,
        [sectionName]: [optionLabel],
      };
    } else {
      const currentIndexOfOption = copyFilter[sectionName].indexOf(optionLabel);
      if (currentIndexOfOption === -1) {
        copyFilter[sectionName].push(optionLabel);
      } else {
        copyFilter[sectionName].splice(currentIndexOfOption, 1);
      }
    }
    setFilters(copyFilter);
    localStorage.setItem("filters", JSON.stringify(filters));
  };

  function createSearchParamsHelper(filterParams) {
    const queryParams = [];
    for (const [key, value] of Object.entries(filterParams)) {
      // ckeck if value is an array
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(",");
        // console.log(paramValue);
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`); // ?category=men%2Cwoman&brand=nike  // , comma => encodeUri => %2C
      }
    }

    // console.log(queryParams, "queryParams");
    return queryParams.join("&");
  }
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  useEffect(() => {
    setSortBy(sortOptions[0].id);
    setFilters(JSON.parse(localStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filters !== null && sortBy !== null) {
      dispatch(
        fetchShopProducts({ filterParams: filters, sortParams: sortBy })
      );
    }
  }, [dispatch, filters, sortBy]);

  useEffect(() => {
    if (productId.length > 0) {
      setOpenDialogProductDetails(true);
      setProductId("");
    }
  }, [productId]);

  return (
    <>
      {openDialogProductDetails && (
        <Dialog_Shop_product_details
          openDialogProductDetails={openDialogProductDetails}
          setOpenDialogProductDetails={setOpenDialogProductDetails}
          productDetails={productDetails}
        />
      )}
      <div className="py-16 px-4 flex justify-start font-medium">
        <div className="w-64 h-full flex flex-col">
          <h2>Filter</h2>
          <div className="w-full h-full flex flex-col items-start">
            {Object.keys(filterOptions).map((section, i) => {
              return (
                <div key={i} className="flex flex-col gap-4">
                  <h3 className="py-4">{section}</h3>
                  {filterOptions[section].map((option, i) => {
                    return (
                      <div key={i} className="flex gap-2">
                        <Checkbox
                          checked={
                            filters &&
                            Object.keys(filters).length > 0 &&
                            filters[section] &&
                            filters[section].indexOf(option.label) > -1
                          }
                          onCheckedChange={() =>
                            handleCheckBox(section, option.label)
                          }
                        />
                        <Label>{option.label}</Label>
                      </div>
                    );
                  })}
                  <Separator className="my-4" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full">
          <div className="w-full flex justify-between px-4 ">
            <h2>All Products</h2>
            <div className="w-auto flex justify-center gap-2">
              <h3 className="h-6">10 Products</h3>
              <div className="h-6 flex justify-center items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="font-medium">
                      <ArrowUpDown size={30} />
                      Sort By
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuRadioGroup
                      value={sortBy}
                      onValueChange={(value) => setSortBy(value)}
                    >
                      {sortOptions.map((item, i) => {
                        return (
                          <DropdownMenuRadioItem value={item.id} key={i}>
                            {item.label}
                          </DropdownMenuRadioItem>
                        );
                      })}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <ShoppingProduct
            shopProducts={shopProducts}
            setProductId={setProductId}
          />
        </div>
      </div>
    </>
  );
};

export default Shop_Filter_sort;
