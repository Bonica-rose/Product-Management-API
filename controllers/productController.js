const products = require("../data/products");


// GET /products
const getProducts = (req, res) => {
    let result = [...products];

    // Search
    if (req.query.keyword) {
        const keyword = req.query.keyword.toLowerCase();

        result = result.filter(product =>
            product.name.toLowerCase().includes(keyword)
        );
    }

    // Sort
    if (req.query.sort) {
        const sortBy = req.query.sort;

        if (sortBy === "price") {
            result.sort((a, b) => a.price - b.price);
        }

        if (sortBy === "-price") {
            result.sort((a, b) => b.price - a.price);
        }
    }

    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || result.length;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedData = result.slice(startIndex, endIndex);

    return res.status(200).json({
        success: true,
        total: result.length,
        page,
        limit,
        data: paginatedData,
    });
};


// GET /products/:id
const getProduct = (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(
        item => item.id === id
    );

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    return res.status(200).json({
        success: true,
        data: product,
    });
};


// POST /products
const createProduct = (req, res) => {
    const { name, price, stock } = req.body;

    const newProduct = {
        id:
            products.length > 0
                ? products[products.length - 1].id + 1
                : 1,
        name,
        price,
        stock,
    };

    products.push(newProduct);

    return res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: newProduct,
    });
};


// PUT /products/:id
const updateProduct = (req, res) => {
    const id = Number(req.params.id);

    const index = products.findIndex(
        product => product.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    const { name, price, stock } = req.body;

    products[index] = {
        id,
        name,
        price,
        stock,
    };

    return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: products[index],
    });
};


// PATCH /products/:id
const patchProduct = (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(
        item => item.id === id
    );

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    Object.assign(product, req.body);

    return res.status(200).json({
        success: true,
        message: "Product partially updated",
        data: product,
    });
};


// DELETE /products/:id
const deleteProduct = (req, res) => {
    const id = Number(req.params.id);

    const index = products.findIndex(
        product => product.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    const deletedProduct = products.splice(index, 1);

    return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        data: deletedProduct[0],
    });
};


// GET /products/stats
const getProductStats = (req, res) => {
    const totalProducts = products.length;

    const totalStock = products.reduce(
        (sum, product) => sum + product.stock,
        0
    );

    return res.status(200).json({
        success: true,
        totalProducts,
        totalStock,
    });
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct,
    getProductStats,
};