const express = require("express")
var app = express()
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 3001
app.use(bodyParser.json())

function errorHandler(err, req, res, next) {
	let statusCode = 500
	let message = "Internal Server Error"

	if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
		statusCode = 400
		message = "Bad Request: Invalid JSON"
	} else if (err instanceof SomeCustomError) {
		statusCode = 400
		message = err.message
	}

	res.status(statusCode).json({ error: message })
}

app.use(errorHandler)

app.get("/error", (req, res, next) => {
	try {
		throw new Error("An error occurred")
	} catch (err) {
		err.status = 400
		console.log(`Status code: ${err.status}`)
		next(err)
	}
})

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})