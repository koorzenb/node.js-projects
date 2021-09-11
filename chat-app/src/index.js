const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");

// Setup static directory to serve
app.use(express.static(publicDirPath));

io.on('connection', (socket) => {
    console.log("New WebSocket connection");

    socket.emit("welcome", "message sent")

    socket.on('sendMessage', (message) => {
        io.emit('broadcast', message);        
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})
