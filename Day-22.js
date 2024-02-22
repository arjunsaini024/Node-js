const { connectToProductDB } = require('./utils/connectToMongoDB');
const { Product } = require("./models/product.model")

/**
 * Creates a new product in MongoDB
 * @param {Object} product - Product object with properties name, price, and quantity
 */
async function createProduct(product) {
    // Your implementation here
    try {
        const isConnectedToDatabase = await connectToProductDB();

        if (isConnectedToDatabase) {
            const newProduct = new Product(product);
            await newProduct.save();
            console.log("Product Added to Database");
        } else {
            console.log("Could not add Product to Database because of some error!");
        }
    } catch (error) {
        console.log(error.message);
    }
}

const product = {
    name: "Tomato",
    price: 50,
    quantity: 5,
}

// createProduct(product);

/**
 * Retrieves all products from MongoDB
 * @returns {Array} - Array of product objects
 */
async function getAllProducts() {
    // Your implementation here
    try {
        const isConnectedToDatabase = await connectToProductDB();

        if (isConnectedToDatabase) {
            const allProducts = await Product.find({}).select("-_id -__v");
            console.log(allProducts);
            return allProducts;
        } else {
            console.log("Could not fetch Products from Database because of some error!");
        }
    } catch (error) {
        console.log(error.message);
    }
}

// getAllProducts();

/**
 * Updates a product in MongoDB
 * @param {string} productId - ID of the product to update
 * @param {Object} updatedProduct - Updated product object
 */
async function updateProduct(productId, updatedProduct) {
    // Your implementation here
    try {
        const isConnectedToDatabase = await connectToProductDB();

        if (isConnectedToDatabase) {
            await Product.findByIdAndUpdate(productId, updatedProduct);
            console.log("Product Updated to Database");
        } else {
            console.log("Could not update Product details to Database because of some error!");
        }
    } catch (error) {
        console.log(error.message);
    }
}

const updatedProduct = {
    price: 50
}

// updateProduct('65d6f1ac36ed021ea8299b97', updatedProduct);

/**
 * Deletes a product from MongoDB
 * @param {string} productId - ID of the product to delete
 */
async function deleteProduct(productId) {
    // Your implementation here
    try {
        const isConnectedToDatabase = await connectToProductDB();

        if (isConnectedToDatabase) {
            await Product.findByIdAndDelete(productId);
            console.log("Product Deleted from Database");
        } else {
            console.log("Could not delete Product from Database because of some error!");
        }
    } catch (error) {
        console.log(error.message);
    }
}

deleteProduct("65d6f1c8afc4fa7cb81bcae7");