const express = require('express');
const app = express();
const rateLimitMiddleware = require('./utils/middlewares/rateLimit')

app.use(rateLimitMiddleware);

app.get('/', (req, res) => {
    res.send("Welcome to the Request Rate-Limiting Middleware Problem");
})

app.get('/limit', (req, res) => {
    res.send("Limit not reached yet!");
})

const port = process.env.PORT || 3000;
app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Listening at http:127.0.0.1:${port}`);
    }
})