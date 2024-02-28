const express = require('express');
const http = require('http');
const setupWebSocketServer = require('./file1');

const app = express();
const server = http.createServer(app);

// Setup WebSocket server
setupWebSocketServer(server);

// Other Express routes and middleware can be added here

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
