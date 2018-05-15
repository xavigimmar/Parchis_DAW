var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var rgbHex = require('rgb-hex');

var mensajes = [{ id: 1, texto: "Bienvenido a la Sala", author: "Server"}];
//var mensajes;
var mensajessala1 = [{ id: 1, texto: "Bienvenido a la Sala 1", author: "Server"}];
var mensajessala2 = [{ id: 1, texto: "Bienvenido a la Sala 2", author: "Server"}];
var mensajessala3 = [{ id: 1, texto: "Bienvenido a la Sala 3", author: "Server"}];
var mensajessala4 = [{ id: 1, texto: "Bienvenido a la Sala 4", author: "Server"}];

var salas = ["Sala 1","Sala 2","Sala 3","Sala 4"];

app.use(express.static('public'));

app.get('/jugar', function (req, res) {
  var directorio = __dirname;
  directorio = directorio.substr(0,55) + '/public/parchis.html';
  res.sendFile(directorio);
});

app.get('/salas', function (req, res) {
  var directorio = __dirname;
  directorio = directorio.substr(0,55) + '/public/salas.html';
  res.sendFile(directorio);
  //res.sendFile( __dirname +  '/public/salas.html');
});

io.on('connection', function (socket) {
  console.log("Alguien se ha conectado con socket");
  socket.emit('messages', mensajes);

  socket.emit("salas", salas);

  socket.on("room",function(sala){
    socket.join(sala);
    console.log("Se ha conectado a la sala " + sala + "");
  });

  socket.on("new-message", function (comentarios) {
    mensajes.push(comentarios);
    console.log("envio los mensajes del server");
    //socket.broadcast.in(getRoom(socket)).emit('messages', mensajes);
    io.sockets.emit("messages", mensajes);
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
    io.sockets.emit("muevoficha", fichasamover)
  });

  socket.on('disconnect',function(){
    console.log("Se ha desconectado");
  });

});

server.listen(9090, function () {
  console.log("Servidor iniciado por el pueto http://localhost:9090");
});

function getRoom(socket){
  var count = 0;function getRoom(socket){
    var count = 0;
    var identifi = socket.id;
    var rooms = socket.adapter.sids[identifi];
    for(var room in rooms){
      if(count == 1) {
        return room;
      }
      count++;
    }
  }
  var identifi = socket.id;
  var rooms = socket.adapter.sids[identifi];
  console.log(rooms);
  for(var room in rooms){
    if(count == 1) {
      return room;
    }
    count++;
  }
}