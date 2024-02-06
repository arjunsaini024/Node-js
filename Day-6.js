const express = require('express');

const app = express();

app.get('/greet', (req, res) => {
    greetHandler(req, res);
});

// Port initialization
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening in PORT: http://127.0.0.1:${port}`);
});


/**
 * Handles GET requests to "/greet" endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function greetHandler(req, res) {
    // Your implementation here
    const name = req.query.name ? req.query.name : "Guest";
    return res.send(`Hello, ${name}!`);
}