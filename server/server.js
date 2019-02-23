const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const publicPath = path.join(__dirname,'../public');


const port =  process.env.PORT || 3000
var app  = express();
var server = http.createServer(app);

const io  = socketIO(server);

io.on('connection', (socket) =>{
    console.log("new user trying to connect");

    socket.on('disconnect',()=>{
        console.log("user disconnected");
    })
})

app.use(express.static(publicPath));

server.listen(port,()=>{
    console.log(`server is listening on port no ${port}`);
})
