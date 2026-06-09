const express = require("express");

const router = express.Router();

const validateProduct = require("../middleware/validateProduct");

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct,
    getProductStats,
} = require("../controllers/productController");

router.get("/", getProducts);

router.get("/stats", getProductStats);

router.get("/:id", getProduct);

router.post(
    "/",
    validateProduct,
    createProduct
);

router.put(
    "/:id",
    validateProduct,
    updateProduct
);

router.patch(
    "/:id",
    patchProduct
);

router.delete(
    "/:id",
    deleteProduct
);

module.exports = router;