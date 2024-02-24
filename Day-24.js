const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(
  "mongodb+srv://arjunsaini:FSRiQ9QYnI7koSJt@cluster0.okwqcv5.mongodb.net/?retryWrites=true&w=majority",
);

// Product schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

// Product model
const Product = mongoose.model("Product", productSchema);

// Create a new product instance
const newProduct = new Product({
  name: "Example Product",
  description: "This is an example product description.",
  price: 19.99,
});

// Save the new product to the database
newProduct
  .save()
  .then((result) => {
    console.log("Product saved successfully:", result);
  })
  .catch((error) => {
    console.error("Error saving product:", error);
  });

// Express route to create a new product
function createProductRoute(req, res) {
  const { name, description, price } = req.body;
  const product = new Product({ name, description, price });
  product
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

// Express route to retrieve all products
function getAllProductsRoute(req, res) {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

// Express route to update a product
function updateProductRoute(req, res) {
  const { id } = req.params;
  const { name, description, price } = req.body;
  Product.findByIdAndUpdate(id, { name, description, price }, { new: true })
    .then((updatedProduct) => {
      res.json(updatedProduct);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

// Express route to delete a product
function deleteProductRoute(req, res) {
  const { id } = req.params;
  Product.findByIdAndDelete(id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

// Define routes
app.post("/products", createProductRoute);
app.get("/products", getAllProductsRoute);
app.put("/products/:id", updateProductRoute);
app.delete("/products/:id", deleteProductRoute);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port ${PORT}');
});