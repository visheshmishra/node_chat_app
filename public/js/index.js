var socket = io();
socket.on('connect',function(){
    console.log("connected to server...........");
})

socket.on('disconnect',function(){
    console.log("disconnect from server......");
})

socket.on('newMessage', function(msgObj){
    var template = $("#message-template").html();
    var formatedTime = moment(msgObj.createdAt).format("h:mm:a");
    var html = Mustache.render(template,{
        from:msgObj.from,
        text:msgObj.text,
        createdAt:formatedTime
    });
    $("#messages").append(html);
},function(str){
    console.log("message received", str);
})

socket.on('newLocationMessage', function(msgObj){
    //var locLink = "<li><span>"+msgObj.from+"</span>&nbsp;&nbsp;&nbsp;<span>"+moment(msgObj.createdAt).format('h:mm:a')+"</span>&nbsp;&nbsp;<span><a href="+msgObj.url+">my location</a></span></li>"
  var template = $("#location-template").html();
    var formatedTime = moment(msgObj.createdAt).format("h:mm:a");
   var html = Mustache.render(template,{
       from:msgObj.from,
       url:msgObj.url,
       createdAt:formatedTime
   })
    $("#messages").append(html);
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
    var messageTxt = $("[name='message']");
    socket.emit("createMessage",{
        from:"User",
        text: messageTxt.val()
    }, function(){
        messageTxt.val("");
    })
}

function sendLocation(){
    $("#sendBtn").attr("disabled","disabled").text("Sending location..");
    if(!navigator.geolocation){
        return alert("geolocation not supported by your browser");
    }
    navigator.geolocation.getCurrentPosition(function (position){
        $("#sendBtn").prop("disabled", false).text("Send Location");
        socket.emit("sendLocation",{
            latitude:position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function(){
        alert("unable to detect position");
        $("#sendBtn").prop("disabled", false).text("Send Location");
    })
}