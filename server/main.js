var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/messages');

var controller = require('./controller.js');
var messages = [];

app.use(express.static('public')); //agrega la parte publica de la app

app.get('/', function(req, res){
  res.status(200).send("hello mad world");
});

io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado por sockets');
    if(messages.length == 0)
         controller.findAllMessages(function(messages){
           console.log(messages);
           socket.emit('messages', messages);
         });

    socket.on('new-message', function(data){
      controller.addMessage(data)
      controller.findAllMessages(function(messages){
        console.log(messages);
        socket.emit('messages', messages);
      });
    });

});
server.listen(8080, function() {
    console.log("Node server running on http://localhost:8080");
  });
