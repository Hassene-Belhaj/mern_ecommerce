const express = require("express");
const {
  upload_Image,
  remove_Image,
  addProduct,
  fetchProducts,
  editProduct,
  DeleteProduct,
} = require("../controllers/product_controller");
const router = express.Router();

router.post("/upload-image", upload_Image);
router.post("/remove-image", remove_Image);
router.post("/add", addProduct);
router.get("/get", fetchProducts);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", DeleteProduct);

module.exports = router;
