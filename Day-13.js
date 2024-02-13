const express = require('express');
const app = express();
const http = require('http');
const WebSocket = require('ws');

// Setting up a simple Express.js http server instance on which we will mount our socket server
const server = http.createServer(app);
app.get('/', (req, res) => {
    return res.send("<b>Welcome to the WebSocket Integration Tutorial. Go to /websocket to establish a WebSocket connection</b>");
})

app.get('/websocket', (req, res) => {
    res.sendFile('/websocket_connection.html', { root: './public' });
})

/**
 * WebSocket server for Express
 * @param {Object} server - HTTP server instance
 */
function setupWebSocket(server) {
    // created a socket server by mounting it on top of the http server instance
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log("Connection Established");

        listenMessageEvents(ws);
        sendNotificationEvents(ws);

        ws.on('close', () => {
            console.log(Connection Disconnected);
            server.closeAllConnections()
        })
    })

}

function listenMessageEvents(ws) {
    // Read message sent from client-side sent as a message event
    ws.on('message', (data) => {
        console.log(Message Received: ${data});
    })
}

function sendNotificationEvents(ws) {
    ws.send("Hello from the Server Side!");
}

const port = process.env.PORT || 3000;

server.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(Server running at http:127.0.0.1:${port});
        setupWebSocket(server);
    }
})