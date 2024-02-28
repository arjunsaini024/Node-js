const WebSocket = require('ws');

function setupWebSocketServer(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    // Handle new WebSocket connection
    console.log('Client connected');

    // Handle incoming messages from clients
    ws.on('message', (message) => {
      // Handle the incoming message (e.g., broadcast to all clients)
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });

    // Handle WebSocket connection closure
    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });
}

module.exports = setupWebSocketServer;
