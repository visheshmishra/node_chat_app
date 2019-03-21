var socket = io();
socket.on('connect',function(){
   var params = $.deparam(window.location.search);
   console.log(params);
   socket.emit('join', params,function(err){
       if(err){
           window.location.href="/";
           alert(err);
       }else{
            console.log("No error");
       }

   })
})

socket.on('disconnect',function(){
    console.log("disconnect from server......");
})

socket.on('updateUserList', function(users){
    var ol = $('<ol></ol>');
    users.forEach((user) => {
        var li = $('<li></li>').text(user);
        ol.append(li);
    });

    $("#users").html(ol);
})

function scrollToBottom(){
    var messages = $("#messages");
    var newMessage = messages.children('li:last-child');
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight ){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('newMessage', function(msgObj){
    var template = $("#message-template").html();
    var formatedTime = moment(msgObj.createdAt).format("h:mm:a");
    var html = Mustache.render(template,{
        from:msgObj.from,
        text:msgObj.text,
        createdAt:formatedTime
    });
    $("#messages").append(html);
    scrollToBottom();
},function(str){
    console.log("message received", str);
})

socket.on('newLocationMessage', function(msgObj){
  var template = $("#location-template").html();
    var formatedTime = moment(msgObj.createdAt).format("h:mm:a");
   var html = Mustache.render(template,{
       from:msgObj.from,
       url:msgObj.url,
       createdAt:formatedTime
   })
    $("#messages").append(html);
    scrollToBottom();
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