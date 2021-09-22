const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {

    socket.on('chat message', message => {
        const data = { message: message, id: socket.id }
        io.emit('chat message', data);
    });

    socket.on('typing', () => {
        io.emit('typing', socket.id)
    });
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});