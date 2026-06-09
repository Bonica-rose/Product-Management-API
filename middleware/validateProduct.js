const validateProduct = (req, res, next) => {
    const { name, price, stock } = req.body;

    if (!name) {
        return res.status(400).json({
            success: false,
            message: "Product name is required",
        });
    }

    if (price === undefined || Number(price) < 0) {
        return res.status(400).json({
            success: false,
            message: "Valid price is required",
        });
    }

    if (stock === undefined || Number(stock) < 0) {
        return res.status(400).json({
            success: false,
            message: "Valid stock is required",
        });
    }

    next();
};

module.exports = validateProduct;