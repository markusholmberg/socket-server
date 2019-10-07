const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);


io.on('connection', function () {
    console.info("User connected");
});

server.listen(3000);
