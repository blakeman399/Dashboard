//External dependencies
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = '3000';
server.listen(port);
var fs = require('fs'),
    request = require('request');
var path = require('path');
var bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.static(path.join(__dirname, '/')));


app.use(bodyParser.urlencoded({
    extended: false
}));


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "index.html"));
    console.log("Serving HTML to Client")
});
app.get('/layouts', function (req, res) {
    res.sendFile(path.join(__dirname + "index.html"));
});



var numClients = 0;
var numConnections = 0;

io.on('connection', function (socket) {
    numClients++;
    numConnections++;
    console.log("Total Connections Since Last Reboot: " + numConnections);
    io.emit('stats', {
        numClients: numClients
    });
    console.log('Connected clients:', numClients);

    socket.on('disconnect', function () {
        numClients--;
        io.emit('stats', {
            numClients: numClients
        });
        console.log('Connected clients:', numClients);
    });
});
