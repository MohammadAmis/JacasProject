import Product from '../models/product.models.js'


export const fetchProduct = async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : null; // Parse limit if provided
        const products = limit
            ? await Product.find().limit(limit) // Apply limit if specified
            : await Product.find(); // Fetch all if no limit

        res.json(products); // Send response
    } catch (error) {
        console.error("Error in Fetching Product", error);
        res.status(500).json({ message: "Error in fetching products" });
    }
};
