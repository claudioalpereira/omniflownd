var express = require('express');
var app = express();
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
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



