const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const publicPath = path.join(__dirname,'../public');


const port =  process.env.PORT || 3000
var app  = express();
var server = http.createServer(app);

const io  = socketIO(server);

io.on('connection', function(socket){
    console.log("new user trying to connect");

    socket.on('disconnect',function(){
        console.log("user disconnected");
    })

    socket.emit('newMessage', {
        from:"vishesh",
        to:"someone special",
        createdAt: new Date().getDate() +"/"+ new Date().getMonth() +"/"+ new Date().getFullYear()
    })
    
    socket.on('createMessage', function(msgObj){
        console.log(msgObj);
    })
})


app.use(express.static(publicPath));

server.listen(port,()=>{
    console.log(`server is listening on port no ${port}`);
})
