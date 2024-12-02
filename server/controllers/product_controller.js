const Product = require("../models/product");
const {
  cloudinary_upload_image,
  remove_image_cloudinary,
} = require("../utils/handle_image");

const upload_Image = async (req, res) => {
  const { image } = req.body;
  try {
    const upload = await cloudinary_upload_image(image);
    return res.status(200).json({
      success: true,
      message: "image uploaded with success",
      url: upload?.secure_url,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error Upload Image",
    });
  }
};

const remove_Image = async (req, res) => {
  const { imageUrl } = req.body;
  try {
    let findProductByImageUrl = await Product.findOne({ image: imageUrl });
    if (!findProductByImageUrl) {
      await remove_image_cloudinary(imageUrl);
      return res.status(200).json({
        success: true,
        message: "image Deleted successfully",
      });
    } else {
      findProductByImageUrl.image = "";
      await findProductByImageUrl.save();
      await remove_image_cloudinary(imageUrl);
      return res.status(200).json({
        success: true,
        message: "image Deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Error Remove Image",
    });
  }
};

const addProduct = async (req, res) => {
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    totalStock,
    salePrice,
    total,
  } = req.body;
  try {
    const product = await Product.create({
      image,
      title,
      description,
      category,
      brand,
      price,
      totalStock,
      salePrice,
      total,
    });
    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error Adding Product",
    });
  }
};

const fetchProducts = async (req, res) => {
  try {
    const productsList = await Product.find({});
    return res.status(200).json({
      success: true,
      products: productsList,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error Fetching Product(s)",
    });
  }
};

const DeleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const findProduct = await Product.findByIdAndDelete(id);
    if (!findProduct)
      return res.status(404).json({
        success: true,
        message: "can not find this product",
      });
    await remove_image_cloudinary(findProduct.image);
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product: findProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error Deleting Product",
    });
  }
};

const editProduct = async (req, res) => {
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    totalStock,
    salePrice,
    total,
  } = req.body;
  const { id } = req.params;
  try {
    let findProduct = await Product.findById(id);
    if (!findProduct)
      return res.status(404).json({
        success: true,
        message: "can not find this product",
      });

    (findProduct.image = image || findProduct.image),
      (findProduct.title = title || findProduct.title),
      (findProduct.description = description || findProduct.description),
      (findProduct.category = category || findProduct.category),
      (findProduct.brand = brand || findProduct.brand),
      (findProduct.price = price || findProduct.price),
      (findProduct.totalStock = totalStock || findProduct.totalStock),
      (findProduct.salePrice =
        salePrice === "" ? 0 : salePrice || findProduct.salePrice),
      (findProduct.total = total || findProduct.total),
      await findProduct.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: findProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error Updating Product",
    });
  }
};

module.exports = {
  upload_Image,
  remove_Image,
  addProduct,
  fetchProducts,
  DeleteProduct,
  editProduct,
};
