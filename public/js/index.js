var socket = io();
socket.on('connect',function(){
    console.log("connected to server...........");
})

socket.on('disconnect',function(){
    console.log("disconnect from server......");
})

socket.on('newMessage', function(msgObj){
    var msgLi = "<li><span>"+msgObj.from+"</span>:&nbsp;&nbsp;&nbsp;<span>"+msgObj.text+"</span></li>"
    $("#messages").append(msgLi);
},function(str){
    console.log("message received", str);
})

/*
socket.emit("createMessage",{
    from:"vishesh",
    text:"hello"
}, function(msg){
    console.log("Got it..", msg);
})
*/
/**
 *$("#btnSubmit").click(function(e){
    console.log("stop page reresh");
    e.preventDefault();
}) 
 */

function formSubmit(e){
    e.preventDefault();
    socket.emit("createMessage",{
        from:$("[name='from']").val(),
        text:$("[name='message']").val()
    }, function(){
        console.log("message sent");
    })
}