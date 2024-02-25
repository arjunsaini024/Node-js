const express = require("express")
const mongoose = require("mongoose")
var app = express()
const PORT = process.env.PORT || 3001
const mongoURL = "mongodb://127.0.0.1/myDataBase"
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	price: {
		type: Number,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
})
const Product = mongoose.model("Product", productSchema)
async function createProductNameIndex() {
	//create index
	try {
		await Product.createIndexes({ name: 1 })
		console.log("Index created successfully.")
		const indexes = await Product.collection.getIndexes()
		console.log("Indexes:", indexes)
	} catch (err) {
		console.error(err.message)
	}
}
function connectToMongoDB() {
	mongoose.connect(mongoURL)
	const db = mongoose.connection
	db.on("error", (err) => {
		console.log('Error connecting to database: ${err}')
	}).once("open", () => {
		console.log("Connected to MongoDB")
	})
}
connectToMongoDB()
createProductNameIndex()

app.get("/", (req, res) => {
	res.send("Welcome to this Project")
})
app.listen(PORT, () => console.log('Server running on port ${PORT}'))