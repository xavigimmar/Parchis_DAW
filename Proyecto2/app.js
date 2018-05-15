var mongo = require(__dirname + '/views/js/mongodb.js');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

app.use('/css', express.static(__dirname + '/views/css'));
app.use('/js', express.static(__dirname + '/views/js'));
app.use('/img', express.static(__dirname + '/views/img'));
app.use('/', express.static(__dirname + '/views'));

// REDIRECCIONES
app.get('/', function(req, res) { // REDIRECCIÓN A RAÍZ
    res.sendFile( __dirname + '/views/index.html');
});

app.get('/login', function(req, res) { // REDIRECCIÓN A LOGIN
    var nombre = req.query.nombre;
    var pass = req.query.pass;
    //res.send(nombre);
    res.sendFile( __dirname + '/views/login.html');
});

app.get('/signup', function(req, res) { // REDIRECCIÓN A REGISTRO
    res.sendFile( __dirname + '/views/signup.html');
});

app.get('/profile', function(req, res) { // REGISTRO DE USUARIO
    mongo.insertarMongo(req.query.usuario, req.query.correo, req.query.pass).then(function(insertar) {
        console.log('Insertado: ' + insertar);
        res.send(insertar);
    });
});

app.get('/entrar', function(req, res) { // LOGIN DE USUARIO
    mongo.login(req.query.nombre, req.query.pass).then(function(resultado) {
        if(resultado === true) {
            // REDIRECCIONAR A LA PÁGINA PRINCIPAL CON LA SESIÓN INICIADA
            //res.sendFile( __dirname + '/views/index.html');
            console.log('Se loguea');
        } else {
            console.log('No se loguea');
        }
    });
});

// Conexión de un nuevo socket
io.on('connection', function(socket) {
    console.log('Nuevo usuario conectado');
});

// Puerto de escucha del servidor
http.listen(3030, function() {
    console.log('Escuchando en el puerto 3030');
});
