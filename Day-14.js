const express = require('express');
const app = express();
const cache = {}

function cachingMiddleware(req, res, next) {
    const url = req.url
    const cachedResponse = cache[url]
    if (cachedResponse) {
        const { data, expiration } = cachedResponse
        if (expiration > Date.now()) {
            console.log('Cached response found for ${url}');
            console.log(cache);
            return res.send(data)
        } else {
            console.log('Cached expired for ${url}');
            delete cache[url]
        }
    }
    console.log("Adding new cached response");
    next()
}

app.use(cachingMiddleware)

app.get('/data', (req, res) => {
    const responseData = "This is the response from the server"
    cache[req.url] = { data: responseData, expiration: Date.now() + 10000 }
    console.log(cache);
    res.send(responseData)
})

app.listen(3000, (req, res) => {
    console.log('Server listening on port 3000');
})