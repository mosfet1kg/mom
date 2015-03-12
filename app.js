var express = require('express'),
    app = express(),
    path = require('path');


var server = app.listen(55555, function(){
    console.log('This server is running on the port ' + this.address().port );
});

var io = require('socket.io').listen(server);

app.use(express.static(path.join(__dirname, 'public')));

io.sockets.on('connection', function(socket){

    socket.on('create or join', function(channel){
        socket.join(channel);
        socket.emit('joined', channel);
    });

    socket.on('publish', function(data){
        console.log(data.channel);
        socket.to(data.channel).emit('subscribe', data.img);
    });
});