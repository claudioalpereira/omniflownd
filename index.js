var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var net = require('net');
var client = new net.Socket();


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
      
    //client.connect(19000, 'omniosaka.dyndns.org', function() {
    client.connect(19000, '62.28.231.130', function() {
        console.log('Connected');
        client.write('+login[357976063980593 , Siemens , Omni2016]');
		
		 console.log("url"+socket.handshake.url);
    clientId=socket.handshake.query.clientId;
    console.log("connected clientId:"+clientId);
    });
        
    client.on('data', function(data) {
        console.log('Received: ' + data);
        io.emit('result received', data.toString());
    });
        
    socket.on('send cmd', function(msg){
        console.log("Send Cmd:"+msg);
        client.write(msg);
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
   
