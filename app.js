const express = require('express');
const app = express();
const port = 8300;
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.origins(['https://mahm.me:443']);
io.set('origins', '*:*');

let users = [];
let userId = 0;

io.on('connection', function (socket) {
    socket.on("send-nickname", (nickname) => {
        let time = new Date();

        socket.nickname = nickname;
        users.push(socket.nickname);
        console.log(users)
        console.log(nickname + " connected");
        // socket.emit("send-nickname", socket.nickname);
        io.emit("send-nickname", {
            user: socket.nickname,
            message: " has connected.",
            time:
                (time.getHours() < 10
                    ? '0' + time.getHours()
                    : time.getHours()) +
                ':' +
                (time.getMinutes() < 10
                    ? '0' + time.getMinutes()
                    : time.getMinutes()),
        });
    })

    socket.on("disconnect", () => {
        io.emit("disconnect", socket.nickname + " disconnected")
    })
    socket.on('chat message', function (message) {
        let time = new Date();
        console.log("Message recieved " + message + " from " + socket.nickname)
        io.emit('chat message', {
            user: socket.nickname,
            message: message,
            time:
                (time.getHours() < 10
                    ? '0' + time.getHours()
                    : time.getHours()) +
                ':' +
                (time.getMinutes() < 10
                    ? '0' + time.getMinutes()
                    : time.getMinutes()),
            });
    });

});

server.listen(port);
console.log('listening on port ', port);
