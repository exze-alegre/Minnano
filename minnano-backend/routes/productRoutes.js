const express = require("express");
const {
  getProductsForHomepage,
  searchProducts,
  getProductDetail,
} = require("../controllers/productController");

const router = express.Router();

router.get("/products/homepage", getProductsForHomepage);

router.get("/products/search/:query", searchProducts);

router.get("/products/:productId", getProductDetail);

module.exports = router;
