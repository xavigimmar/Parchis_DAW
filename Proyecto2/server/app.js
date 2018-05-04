var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

app.use(express.static('views'));

app.get('/', function(req, res) {
    //res.sendFile( __dirname + '/index.html');
    res.sendFile(path.join(__dirname, '../views', '/index.html'));
});

app.get('/login', function(req, res) {
    var nombre = req.query.nombre;
    var pass = req.query.pass;
    //res.send(nombre);
    //res.sendFile( __dirname + '/login.html');
    res.sendFile(path.join(__dirname, '../views', '/login.html'));
});

// Conexión de un nuevo socket
io.on('connection', function(socket) {
    console.log('Nuevo usuario conectado');
});

// Puerto de escucha del servidor
http.listen(3030, function() {
    console.log('Escuchando en el puerto 3030');
});