const express = require("express")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")

const app = express()
const PORT = process.env.PORT || 3001
const SECRET = "ThisIsSecret"
const users = require("./user")

app.use(bodyParser.json())

function authenticateAndAuthorize(req, res, next) {
	const token = req.headers["authorization"]
	if (!token) {
		return res.status(401).json({ message: "Unauthorized: Token not provided" })
	}
	try {
		const decoded = jwt.verify(token, SECRET)
		req.user = decoded
		console.log("Decoded token:", decoded)
		const user = users.find((u) => u.id === decoded.id)
		if (!user || (req.user.role && user.role !== req.user.role)) {
			return res
				.status(403)
				.json({ message: "Forbidden: Insufficient permissions" })
		}
		if (req.originalUrl.startsWith("/admin") && user.role !== "admin") {
			return res
				.status(403)
				.json({ message: "Unauthorized access!!User can't access admin page" })
		} else if (req.originalUrl.startsWith("/user") && user.role !== "user") {
			return res
				.status(403)
				.json({ message: "Unauthorized access!!Admin can't access user page" })
		}
		next()
	} catch (error) {
		console.error("Token verification error:", error.message)
		return res.status(401).json({ message: "Failed to authenticate token" })
	}
}

// Route for user login
app.post("/login", (req, res) => {
	const { username, password, role } = req.body
	const user = users.find(
		(u) => u.username === username && u.password === password && u.role === role
	)

	if (user) {
		// Generate JWT token upon successful login
		const token = jwt.sign(
			{ id: user.id, username: user.username, role: user.role },
			SECRET
		)
		res.json({ message: "Login successful", token })
	} else {
		res.status(401).json({ message: "Invalid username, password, or role" })
	}
})

app.get("/admin", authenticateAndAuthorize, (req, res) => {
	res.json({ message: "Welcome to the admin page" })
})

app.get("/user", authenticateAndAuthorize, (req, res) => {
	res.json({ message: "Welcome to the user page" })
})

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})