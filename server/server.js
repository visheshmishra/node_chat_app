const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const publicPath = path.join(__dirname,'../public');
const {isRealString} = require('./utils/validation')
var {generateMessage, generateLocationMessage}  = require('./utils/message');
const {Users} = require('./utils/users');


const port =  process.env.PORT || 3000
var app  = express();
var server = http.createServer(app);

const io  = socketIO(server);
var users = new Users();

io.on('connection', function(socket){
    console.log("new user trying to connect");

    socket.on('disconnect',function(){
       var user =  users.removeUser(socket.id);
       if(user){
           io.to(user.room).emit('updateUserList',users.getUserList(user.room));
           io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} left the room`));
       }
    })



    socket.on('join',(params,callback) =>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback("Name and room name are required");
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name,params.room);
        io.to(params.room).emit('updateUserList',users.getUserList(params.room));
        socket.emit('newMessage',generateMessage("Admin","Welcome to chat app"));
        socket.broadcast.to(params.room).emit('newMessage',generateMessage("Admin",`User ${params.name} has joined`));

        callback();
    })

    /*socket.emit('newMessage', {
        from:"vishesh",
        to:"someone special",
        createdAt: new Date().getDate() +"/"+ new Date().getMonth() +"/"+ new Date().getFullYear()
    })
    */

    

    socket.on('sendLocation', function(coords){
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name,coords.latitude,coords.longitude))   
        }
    })
    
    socket.on('createMessage', function(msgObj, callback){
        var user = users.getUser(socket.id);
        if(user && isRealString(msgObj.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name, msgObj.text))
        }
        callback('Hey message sent from me...');
    })
})

app.use(express.static(publicPath));

server.listen(port,()=>{
    console.log(`server is listening on port no ${port}`);
})
