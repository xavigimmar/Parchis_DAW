var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('views'));

app.get('/', function(req, res) {
    res.sendFile( __dirname + '/index.html');
});

// Conexión de un nuevo socket
io.on('connection', function(socket) {
    console.log('Nuevo usuario conectado');
});

// Puerto de escucha del servidor
http.listen(8080, function() {
    console.log('Escuchando en el puerto 8080');
});