const Product = require("../models/product");

const get_filtred_products = async (req, res) => {
  const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;
  let filters = {};
  if (category.length) {
    filters.category = { $in: category.split(",") };
  }
  if (brand.length) {
    filters.brand = { $in: brand.split(",") };
  }

  // console.log(filters);
  let sort = {};
  switch (sortBy) {
    case "price-lowtohigh":
      sort.price = 1;
      break;
    case "price-hightolow":
      sort.price = -1;
      break;
    case "title-atoz":
      sort.title = 1;
      break;
    case "title-ztoa":
      sort.title = -1;
      break;
    default:
      break;
  }

  try {
    const products = await Product.find(filters).sort(sort);
    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching  Shop Products",
    });
  }
};

const get_singleProduct_details = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product)
      return res.status(404).json({
        message: "this Product do not exist",
      });
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error Fetching Product details ",
    });
  }
};

module.exports = {
  get_filtred_products,
  get_singleProduct_details,
};
