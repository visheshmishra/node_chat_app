var socket = io();
socket.on('connect',function(){
    console.log("connected to server...........");
    socket.emit('createEmail',{
        from:"vishesh1@gmail.com",
        to:"vishesh2@gmail.com"
    });

   /* socket.emit('createMessage',{
        from:"someone special",
        to:"vishesh"
    })*/
})

socket.on('disconnect',function(){
    console.log("disconnect from server......");
})
socket.on('newEmail',function(obj){
    console.log('new email',obj );
})

socket.on('newMessage', function(msgObj){
    console.log(msgObj);
})