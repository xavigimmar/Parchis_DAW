var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var rgbHex = require('rgb-hex');
var _eval = require('eval');

var mensajes = [{ id: 1, texto: "Bienvenido a la Sala", author: "Server" }];
//var mensajes;
var mensajesSala1 = [{ texto: "Bienvenido a la Sala 1", author: "Server" }],
  mensajesSala2 = [{ texto: "Bienvenido a la Sala 2", author: "Server" }],
  mensajesSala3 = [{ texto: "Bienvenido a la Sala 3", author: "Server" }],
  mensajesSala4 = [{ texto: "Bienvenido a la Sala 4", author: "Server" }];

var salasuser = {};

// azul: #3831eb      rojo: #a11f1f  
// amarillo: #e8c45e  verde: #188300
var contadoresSalas = new Map();
contadoresSalas.set("Sala1", 0);
contadoresSalas.set("Sala2", 0);
contadoresSalas.set("Sala3", 0);
contadoresSalas.set("Sala4", 0);

var participantesSala1 = new Map(),
  participantesSala2 = new Map(),
  participantesSala3 = new Map(),
  participantesSala4 = new Map();

participantesSala1.set('#3831eb', "").set('#188300', "");
participantesSala2.set('#3831eb', "").set('#188300', "");
participantesSala3.set('#3831eb', "").set('#188300', "");
participantesSala4.set('#3831eb', "").set('#188300', "");

var salaactual;
var salas = ["Sala1", "Sala2", "Sala3", "Sala4"];

app.use(express.static('public'));

app.get('/', function (req, res) {
  var directorio = __dirname;
  directorio = directorio.substr(0, 55) + '/public/salas.html';
  res.sendFile(directorio);
});

app.get('/jugar', function (req, res) {
  /*console.log(req.body);
  salaactual = req.params;*/
  var directorio = __dirname;
  directorio = directorio.substr(0, 55) + '/public/parchis.html';
  res.sendFile(directorio);
});

app.get('/salas', function (req, res) {
  var directorio = __dirname;
  directorio = directorio.substr(0, 55) + '/public/salas.html';
  res.sendFile(directorio);
  //res.sendFile( __dirname +  '/public/salas.html');
});

io.on('connection', function (socket) {
  console.log("Alguien se ha conectado con socket");
  socket.emit('messages', mensajes);

  socket.emit("salas", salas);

  socket.on("room", function (sala) {
    socket.join(sala);

    salasuser[socket.id] = sala;
    //console.log(salasuser);

    if (sala == "Sala1") {
      var keys = Array.from(participantesSala1.keys());
      //console.log(keys);
      var cont = contadoresSalas.get('Sala1');
      participantesSala1.set(keys[cont], socket.id);
      cont++;
      contadoresSalas.set('Sala1', cont);
      //console.log(participantesSala1);
    }
    if (sala == "Sala2") {
      var keys = Array.from(participantesSala2.keys());
      //console.log(keys);
      var cont = contadoresSalas.get('Sala2');
      participantesSala2.set(keys[cont], socket.id);
      cont++;
      contadoresSalas.set('Sala2', cont);
      //console.log(participantesSala2);
    }
    if (sala == "Sala3") {
      var keys = Array.from(participantesSala3.keys());
      //console.log(keys);
      var cont = contadoresSalas.get('Sala3');
      participantesSala3.set(keys[cont], socket.id);
      cont++;
      contadoresSalas.set('Sala3', cont);
      //console.log(contadoresSalas);
    }
    if (sala == "Sala4") {
      var keys = Array.from(participantesSala4.keys());
      console.log("--ides de la sala: " + keys);
      var cont = contadoresSalas.get('Sala4');
      console.log("---personas en la sala: " + cont);
      participantesSala4.set(keys[cont], socket.id);
      console.log("----añade persona a la sala: ");
      console.log(participantesSala4);
      cont++;
      console.log("-----suma 1 al contador: " + cont);
      contadoresSalas.set('Sala4', cont);
      console.log("-------valor de la sala: ");
      console.log(contadoresSalas);
    }

    console.log("Se ha conectado a la sala " + sala + "");
  });

  socket.on("new-message", function (comentarios) {
    if (getRoom(socket) == "Sala1") mensajes = mensajesSala1;
    if (getRoom(socket) == "Sala2") mensajes = mensajesSala2;
    if (getRoom(socket) == "Sala3") mensajes = mensajesSala3;
    if (getRoom(socket) == "Sala4") mensajes = mensajesSala4;

    mensajes.push(comentarios);
    console.log("envio los mensajes del server");
    io.sockets.in(getRoom(socket)).emit('messages', mensajes);
    //io.sockets.emit("messages", mensajes);
  });

  socket.on("dados", function (dados) {
    console.log(dados[0], dados[1]);
    io.sockets.in(getRoom(socket)).emit("actualizartitulo", dados, getRoom(socket));
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
    //io.sockets.emit("muevoficha", fichasamover);
    io.sockets.in(getRoom(socket)).emit("muevoficha", fichasamover);
  });

  socket.on('disconnect', function () {
    console.log(salasuser);
    var usersal = salasuser[socket.id];
    console.log("--sala del socket(usersal): " + usersal);
    var cont = contadoresSalas.get(usersal);
    console.log("---personas en la sala: " + cont);
    cont--;
    console.log("-----resta 1 al contador: " + cont);
    contadoresSalas.set(usersal, cont);
    console.log("-------valor de la sala: ");
    console.log(contadoresSalas);

    delete salasuser[socket.id];
    console.log(participantesSala4);
    var keysalas;
    if(usersal == "Sala1") {
      keysalas = Array.from(participantesSala1.keys()); 
      for(let key of keysalas){
        if(participantesSala1.get(key) == socket.id) participantesSala1.set(key,""); 
      }
    }
    if(usersal == "Sala2") {
      keysalas = Array.from(participantesSala2.keys()); 
      for(let key of keysalas){
        if(participantesSala2.get(key) == socket.id) participantesSala2.set(key,""); 
      }
    }
    if(usersal == "Sala3") {
      keysalas = Array.from(participantesSala3.keys()); 
      for(let key of keysalas){
        if(participantesSala3.get(key) == socket.id) participantesSala3.set(key,""); 
      }
    }
    if(usersal == "Sala4") {
      keysalas = Array.from(participantesSala4.keys()); 
      for(let key of keysalas){
        if(participantesSala4.get(key) == socket.id) participantesSala4.set(key,""); 
      }
    } 

    console.log(keysalas);
    console.log(participantesSala4);
    //var test = salasuser.getkey();
    console.log("Se ha desconectado");
  });

});

server.listen(9090, function () {
  console.log("Servidor iniciado por el pueto http://localhost:9090");
});

function getRoom(socket) {
  var count = 0;
  var identifi = socket.id;
  var rooms = socket.adapter.sids[identifi];
  for (var room in rooms) {
    //console.log(room);
    if (count == 1) return room;
    count++;
  }
}