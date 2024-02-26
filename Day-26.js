const express = require("express")
const mongoose = require("mongoose")
var app = express()
const PORT = process.env.PORT || 3001
const mongoURL = "mongodb://127.0.0.1/mydatabase"
app.use(express.json())
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
async function getProductStatistics(req, res) {
	try {
		const stats = [
			{
				$group: {
					_id: null,
					totalProducts: { $sum: 1 },
					totalPrice: { $sum: "$price" },
					highestQuantity: { $max: "$quantity" },
				},
			},
			{
				$project: {
					_id: 0,
					totalProducts: 1,
					averagePrice: { $divide: ["$totalPrice", "$totalProducts"] },
					highestQuantity: 1,
				},
			},
		]
		const data = await Product.aggregate(stats)
		if (data.length === 0) {
			res.send({ totalProducts: 0, averagePrice: 0, highestQuantity: 0 })
		} else res.send(data)
	} catch (err) {
		res.status(500).send(err.message)
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
app.get("/", (req, res) => {
	res.send("Welcome to this Project")
})
app.get("/statistics", getProductStatistics)
app.listen(PORT, () => console.log('Server running on port ${PORT}'))