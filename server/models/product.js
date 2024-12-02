const { Schema, models, model } = require("mongoose");

const productModel = new Schema(
  {
    image: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    brand: {
      type: String,
    },
    price: {
      type: Number,
    },
    salePrice: {
      type: Number,
    },
    total: {
      type: Number,
    },
    totalStock: {
      type: Number,
    },
    averageReview: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Product = models?.Product || model("Products", productModel);

module.exports = Product;
