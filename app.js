var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.port || 3000;



app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var routes = require('./routes/main');
routes(app, io, __dirname);

var sockets = require('./routes/sockets');
sockets(io);

http.listen(port);
console.log('App running on port ' + port);