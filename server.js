const express = require('express');

const app = express();
const http = require('http');
const expressServer = http.createServer(app);

// implement socket server in server side
const {Server} = require('socket.io');
const io = new Server(expressServer);

io.on('connection', (socket) => {
    console.log('new user connected');


    //practich room
    socket.join('kitchen-room')
    io.sockets.in('kitchen-room').emit('cooking', "now I'm cooking under kitchen-room");

    socket.join('bed-room');
    const bedRoomUserCount = io.sockets.adapter.rooms.get('bed-room').size
    io.sockets.in('bed-room').emit('sleep', "Now I'm sleeping under bed-room" + bedRoomUserCount);

    // socket.send('welcome to the  server buy space');

    // socket.on('message', (data) => {
    //     io.sockets.emit('myNameEvent', data);
    // })

    // setInterval(() => {
    //     const date = new Date()
    //     const time = date.toLocaleTimeString()
    //     socket.send(time);
    // }, 1000)

    // // we use emit to create own event
    // setInterval(() => {
    //     const randomNumber = Math.floor(Math.random() * 10000);
    //     socket.emit('myRandomNumberEvent', randomNumber);
    // }, 1000)
})


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})


expressServer.listen(port = 5006, () => {
    console.log('server running on port', 5006)
})
