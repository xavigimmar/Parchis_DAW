var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var rgbHex = require('rgb-hex');

var mensajes = [{
  id: 1,
  texto: "hola tengo tierras",
  author: "pepe villuela"
}]

var salas = ["Sala 1","Sala 2","Sala 3","Sala 4"];

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.status(200).send("Pipas pal pajaro");
});

app.get('/salas', function (req, res) {
  res.sendFile( '/home/administrador/Escritorio/repositorio/Parchis_DAW/public/salas.html');
});

io.on('connection', function (socket) {
  console.log("Alguien se ha conectado con socket");
  socket.emit('messages', mensajes);

  socket.emit("salas", salas);

  socket.on("room",function(sala){
    socket.join(sala);
    console.log("Se ha conectado a la sala '" + sala + "'");
  });

  socket.on("new-message", function (data) {
    mensajes.push(data);
    io.sockets.emit('messages', mensajes);
  });

  socket.on("dados", function (dados) {
    console.log(dados[0], dados[1]);
    io.sockets.emit("actualizartitulo", dados);
  });

  socket.on("rgbTohx", function (color) {
    var hx = "#" + rgbHex(color);
    socket.emit("resrgbTohx", hx);
  });

  socket.on("conectado", function () {
    socket.broadcast.emit("hola");
  });

  socket.on("movimiento", function (fichasamover) {
    console.log("He recivido un movimiento");
    socket.broadcast.emit("muevoficha", fichasamover)
  });

});

server.listen(9090, function () {
  console.log("Servidor iniciado por el pueto http://localhost:9090");
});
