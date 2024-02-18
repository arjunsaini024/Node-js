const mongoose = require("mongoose")
const express = require("express")
const PORT = process.env.PORT || 3001
const app = express()
const userSchema = new mongoose.Schema({
	username: String,
	email: String,
})

const User = mongoose.model("User", userSchema)

async function getAllUsers(req, res) {
	try {
		let users = await User.find()
		if (!users) return res.status(404).send("No Users Found")
		res.json(users)
	} catch (err) {
		console.log(err)
		res.status(500).send("Server Error")
	}
}
function connectToMongoDB() {
	mongoose.connect("mongodb://127.0.0.1/myDataBase")
	const db = mongoose.connection
	db.on("error", (err) => {
		console.log(`Error connecting to database: ${err}`)
	}).once("open", () => {
		console.log("Connected to MongoDB")
	})
}

connectToMongoDB()

app.get("/users", getAllUsers)

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})