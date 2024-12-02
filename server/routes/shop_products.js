const express = require("express");
const {
  get_filtred_products,
  get_singleProduct_details,
} = require("../controllers/shop_products_controller");

const router = express.Router();

router.get("/get_products", get_filtred_products);
router.get("/get_products/:id", get_singleProduct_details);

module.exports = router;
