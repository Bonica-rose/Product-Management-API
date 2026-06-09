const express = require("express");

const productRoutes = require("./routes/productRoutes");

const app = express();

const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json());


// Logger Middleware
app.use((req, res, next) => {
    console.log(
        `[${new Date().toISOString()}]`,
        req.method,
        req.url
    );

    next();
});


// Health Check
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Product Management API Running",
    });
});


// Routes
app.use("/products", productRoutes);


// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});


app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});