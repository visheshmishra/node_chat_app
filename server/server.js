const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const publicPath = path.join(__dirname,'../public');
var {generateMessage, generateLocationMessage}  = require('./utils/message');


const port =  process.env.PORT || 3000
var app  = express();
var server = http.createServer(app);

const io  = socketIO(server);

io.on('connection', function(socket){
    console.log("new user trying to connect");

    socket.on('disconnect',function(){
        console.log("user disconnected");
    })

    /*socket.emit('newMessage', {
        from:"vishesh",
        to:"someone special",
        createdAt: new Date().getDate() +"/"+ new Date().getMonth() +"/"+ new Date().getFullYear()
    })
    */

    socket.emit('newMessage',generateMessage("Admin","Welcome to chat app"));

    socket.broadcast.emit('newMessage',generateMessage("Admin","New user has joined"));

    socket.on('sendLocation', function(coords){
        io.emit('newLocationMessage', generateLocationMessage("Admin",coords.latitude,coords.longitude))
    })
    
    socket.on('createMessage', function(msgObj, callback){
        io.emit('newMessage',generateMessage(msgObj.from, msgObj.text))
        callback('Hey message sent from me...');
    })
})

app.use(express.static(publicPath));

server.listen(port,()=>{
    console.log(`server is listening on port no ${port}`);
})
