/*

Which of the following are examples of node modules?

a. Express

b. Body-parser

c. Socket.io

d. All of the above

*/

//Solution:

/*
d. All of the above

1.  Express is a minimalist and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. It simplifies the process of creating server-side applications by providing a powerful routing system, middleware support, and various HTTP utility methods. With its simplicity and flexibility, Express allows developers to quickly build scalable and modular web applications.

*/

//Example:
/*
const express = require('express');
const app = express();

// Define routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
*/

/*
2.  Body-parser is a middleware for handling JSON, Raw, Text and URL encoded form data. It is used to parse the incoming request bodies in a middleware before your handlers, available under the req.body property.
*/

//Example:
/*
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    res.send(`Username: ${username}, Password: ${password}`);
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
*/

/*
3.  Socket.io is a library that enables real-time, bidirectional and event-based communication between web clients and servers. It is built on top of the WebSockets API and provides a simple and elegant API for creating real-time applications.
*/

//Exmpale:
/*
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Define a connection event
io.on('connection', (socket) => {
    console.log('A user connected');

    // Define a chat message event
    socket.on('chat message', (msg) => {
        console.log('Message:', msg);
        io.emit('chat message', msg);
    }
});

// Start the server
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
*/

// Therefore, all of the above are examples of node modules.