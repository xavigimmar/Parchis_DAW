var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

app.use('/css', express.static(__dirname + '/views/css'));
app.use('/js', express.static(__dirname + '/views/js'));
app.use('/img', express.static(__dirname + '/views/img'));
app.use('/', express.static(__dirname + '/views'));

// REDIRECCIONES
app.get('/', function(req, res) {
    res.sendFile( __dirname + '/views/index.html');
});

app.get('/login', function(req, res) {
    var nombre = req.query.nombre;
    var pass = req.query.pass;
    //res.send(nombre);
    res.sendFile( __dirname + '/views/login.html');
});

app.get('/signup', function(req, res) {
    res.sendFile( __dirname + '/views/signup.html');
});

// Conexión de un nuevo socket
io.on('connection', function(socket) {
    console.log('Nuevo usuario conectado');
});

// Puerto de escucha del servidor
http.listen(3030, function() {
    console.log('Escuchando en el puerto 3030');
});