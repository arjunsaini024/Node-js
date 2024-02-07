const express = require('express');
const app = express();
const port = 3000;
/**
 * Express middleware to log incoming requests
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function requestLoggerMiddleware(req, res, next) {
    const timestamp = new Date().toLocaleString();
    const method = req.method;
    console.log(`${timestamp} - ${method} request received`);
    // Continue to the next middleware or route handler
    next();
}
// Use the middleware for all routes
app.use(requestLoggerMiddleware);
// Define a route to handle incoming requests
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// Start the Express server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});