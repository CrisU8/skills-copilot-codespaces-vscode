// create web server
var express = require('express');
var app = express();
// create server
var http = require('http').Server(app);
// create socket
var io = require('socket.io')(http);

// when user connect
io.on('connection', function(socket){
  console.log('a user connected');
  // when user disconnect
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  // when user send message
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

// create route
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// run server
http.listen(3000, function(){
  console.log('listening on *:3000');
});
