var socket = io.connect();
//var socket = io.connect('http://192.168.12.83:9090/', { 'forceNew': true });

// renderizado de los mensajes del chat
socket.on('messages', function (data) {
  //console.log(data);
  render(data);
});

// Incustacion de los dados aleatorios en el titulo
socket.on("actualizartitulo", function (dados, room) {
  document.getElementById('h1').innerHTML = "Parchís " + " - " + room + " (" + dados[0] + "," + dados[1] + ")";
  var dice = d3.selectAll("#dice");
  dice.remove();

  var dice2 = d3.selectAll("#dice2");
  dice2.remove();

  dados3drival(dados);
});

socket.on("borrarsala", function () {
  console.log(sessionStorage.getItem("sala"));
  sessionStorage.removeItem("sala");
  console.log(sessionStorage.getItem("sala"));
});

// Decirle al cliente que la sala está llena y redirigirlo a las salas
socket.on("salallena", function () {
  alert("La sala esta llena");
  location.href = "/";
});

// mensaje de alerta de cuando se conecta un usuario a la partida
socket.emit('conectado');


/*
socket.on("hola", function () {
  alert("Hola me he conectado a tu partida");
});*/

// funcion de añadir mensajes al array del chat
function render(data) {
  var html = data.map(function (element, index) {
    return (`<div>
              <strong>${element.author}</strong>:
              <em>${element.texto}</em>
            </div>`);
  }).join(" ");

  document.getElementById('messages').innerHTML = html;
}

// funcion de crear mensajes del chat
function addMessage(e) {
  var mensaje = {
    author: document.getElementById('username').value,
    texto: document.getElementById('texto').value
  }

  socket.emit("new-message", mensaje);
  return false;
}

var daditos = 0;



// carga de las funciones del js
window.onload = function () {

  var puentes = [];
  var fichasamover = [];
  var opciones = [];
  var turnos;
  var cas = new RegExp(/fill:#([a-f0-9]+)/);

  // paso la sala por el localstorage
  salatual = sessionStorage.getItem("sala");

  var titulo = document.getElementById('h1');
  titulo.innerHTML = titulo.innerHTML + " - " + salatual;

  // union a la sala que quiere unirse
  socket.emit("room", salatual);

  var sala;

  var lanzar_dados = document.getElementById('boton');

  // funcion para generar los dados
  var dados;

  var participantes = new Map();

  socket.on("genteensala", function (gentedesala) {
    participantes = gentedesala;
    console.log("gente que hay en sala, color y turno");
    //'#3831eb', ""     '#188300', ""     'turno', 0/1
    console.log(participantes);

    var socketcolores = Object.values(participantes);
    turnos = participantes.turno;
    var tusocket = socket.id;
    var colorparticipante;
    if (turnos == 0) colorparticipante = socketcolores[0];
    else colorparticipante = socketcolores[1];

    console.log(colorparticipante + " - " + tusocket);
    if (colorparticipante == tusocket) {

      tirada(turnos);

    } else {
      alert("turno del rival");
    }


  });


  function tirada(turnos) {
    var toca = turnos;
    //}
    lanzar_dados.addEventListener("click", lanzardados);

    function lanzardados() {
      var caca = dados3d(caca);
      dados = Array(caca[0], caca[1]);
      socket.emit("dados", dados);
    }

    // variable que coge el svg del parchis
    var svg = d3.select(document.getElementById("parchis").contentDocument);
    // console.log(svg);

    // inicializacion de la variable que contendra los puentes y los movimientos de las fichas
    var puentes = [];
    var fichasamover = [];
    var opciones = [];
    var cas = new RegExp(/fill:#([a-f0-9]+)/);

    svg
      .selectAll('*[id^="ficha"]')   // selecciona todos los elementos que empiezen por el id ficha
      .on("mouseover", colorearcasillas) // funcion para iluminar casillas donde puedes poner las fichas
      .on("click", seleccionarfichas) //funcion para seleccionar fichas
      .on("mouseout", descolorearcasillas);


    function seleccionarfichas() {

      if (typeof dados != "undefined") {
        // variable para el id de las fichas
        var id = d3.select(this).attr("id");

        // generar array para pas fichas a mover
        if (fichasamover.length != 2) {
          var relleno = rgb2hex(this.style.fill);

          // condicion si el array ya tiene una ficha
          if (fichasamover.length == 1) {
            var ficha2 = new Object();
            ficha2.id = id;
            ficha2.fill = relleno;
            fichasamover.push(ficha2);

            //console.log(fichasamover);
          } else {
            // control de la posicion donde la quieres poner
            if (relleno != "#ffffff") { // si no es blanca
              var ficha1 = new Object();
              ficha1.id = id;
              ficha1.fill = relleno;
              fichasamover.push(ficha1);
            } else {
              console.log("la ficha es blanca");
            }
          }
        }

        // hacer el movimiento cuando ya has seleccionado 2 fichas
        if (fichasamover.length == 2) {//salatual
          socket.emit("movimiento", fichasamover);
          fichasamover = [];

          if (toca == 0) toca = 1;
          else toca = 0;
          socket.emit("cambiarturno", toca);
        }
      }
    }

    function colorearcasillas() {
      if (typeof dados != "undefined") {
        var idficha = d3.select(this).attr("id");
        idficha = "#" + idficha;

        var casilla = svg.select(idficha).attr('style');
        var colorfich = "";

        for (var i = 30; i < 37; i++) {
          colorfich += casilla.charAt(i);
        }

        if (colorfich != "#ffffff") {
          var num = idficha.charAt(6) + idficha.charAt(7);
          //console.log(num);
          if (isNaN(num)) {
            num = idficha.charAt(10) + idficha.charAt(11);
          }
          //console.log(num);

          var mouse = d3.select(this).attr("id");
          var temp1 = parseInt(num) + dados[0],
            temp2 = parseInt(num) + dados[1],
            temp3 = parseInt(num) + dados[0] + dados[1];

          if (temp1 < 10) temp1 = "0" + temp1;
          if (temp2 < 10) temp2 = "0" + temp2;
          if (temp3 < 10) temp3 = "0" + temp3;

          var opcion1 = "#casilla" + temp1;
          var opcion2 = "#casilla" + temp2;
          var opcion3 = "#casilla" + temp3;

          opciones.push(opcion1);
          opciones.push(opcion2);
          opciones.push(opcion3);

          for (var elementos of opciones) {
            var casilla = svg.select(elementos).attr('style');
            var casillacolor = casilla.replace(cas, "fill:#00ccff");
            svg.select(elementos).attr('style', casillacolor);
          }

        }
      }
    }

    function descolorearcasillas() {
      var defec;
      for (var elementos of opciones) {
        var ponercolor = svg.select(elementos).attr('style');

        if (elementos == "#casilla05") defec = "fill:#ff0000";
        else if (elementos == "#casilla68") defec = "fill:#ff0000";
        else if (elementos == "#casilla17") defec = "fill:#188300";
        else if (elementos == "#casilla22") defec = "fill:#188300";
        else if (elementos == "#casilla34") defec = "fill:#f6ff4b";
        else if (elementos == "#casilla39") defec = "fill:#f6ff4b";
        else if (elementos == "#casilla39") defec = "fill:#3831eb";
        else if (elementos == "#casilla39") defec = "fill:#3831eb";
        else defec = "fill:#ffffff";

        var ponercolorsus = ponercolor.replace(cas, defec);
        svg.select(elementos).attr('style', ponercolorsus);
      }
      opciones = [];
    }

    // funcion para mover las fichas

    socket.on("muevoficha", function (fichas) {
      moverfichas(fichas);
    });

    function moverfichas(fichas) {
      var r = new RegExp(/fill:#([a-f0-9]+)/);
      var r1 = new RegExp(/opacity:(0|1)+/);

      var idficha1 = "#" + fichas[0].id;
      var colorficha1 = "fill:" + fichas[0].fill;
      var idficha2 = "#" + fichas[1].id;
      var colorficha2 = "fill:" + fichas[1].fill;

      var pos3 = idficha1.substr(0, idficha1.length - 1) + "3";
      var pos2 = idficha1.substr(0, idficha1.length - 1) + "2";
      var pos1 = idficha1.substr(0, idficha1.length - 1) + "1";

      if (idficha1 == idficha2) {
        alert("No puedes poner la ficha en el mismo sitio!!!\nTonto!");
      } else if (idficha2 == pos3 || idficha2 == pos2 || idficha2 == pos1) {
        alert("Que pretendes?\nDuplicarte?");
      } else {
        if (idficha1.charAt(idficha1.length - 1) != 2) {
          pos3 = idficha1.substr(0, idficha1.length - 1) + "3";
          pos2 = idficha1.substr(0, idficha1.length - 1) + "2";
          pos1 = idficha1.substr(0, idficha1.length - 1) + "1";

          var fichaarriba = svg.select(pos3).attr('style');
          var fichaarribablanca = fichaarriba.replace(r, "fill:#ffffff");
          var fichaarribablancapaca = fichaarribablanca.replace(r1, "opacity:0");
          svg.select(pos3).attr('style', fichaarribablancapaca);

          var fichamedio = svg.select(pos2).attr('style');
          var fichamediocolor = fichamedio.replace(r, colorficha1);
          var fichamediocolormostrar = fichamediocolor.replace(r1, "opacity:1");
          svg.select(pos2).attr('style', fichamediocolormostrar);

          var fichaabajo = svg.select(pos1).attr('style');
          var fichaabajoblanca = fichaabajo.replace(r, "fill:#ffffff");
          var fichaabajoblancapaca = fichaabajoblanca.replace(r1, "opacity:0");
          svg.select(pos1).attr('style', fichaabajoblancapaca);
        }

        if (idficha2.charAt(idficha2.length - 1) != 2) {
          pos33 = idficha2.substr(0, idficha2.length - 1) + "3";
          pos22 = idficha2.substr(0, idficha2.length - 1) + "2";
          pos11 = idficha2.substr(0, idficha2.length - 1) + "1";
          console.log("La segunda ficha no es la del medio");

          var fichacentral = svg.select(pos22);
          var ocupada = fichacentral.attr('style');

          var color = "";
          for (var i = 30; i < 37; i++) {
            color += ocupada.charAt(i);
          }

          if (color == "#ffffff") { // si es blanca
            console.log("La posición del medio está libre");
            idficha2 = pos22;
          } else if (color != "#ffffff" || (pos33 == fichas[0].fill && pos11 == fichas[0].fill)) {
            console.log("hay un puente y no puedes mover");
            alert("hay un puente, imposible mover");
            idficha2 = idficha1;
          } else if (color == fichas[0].fill) {
            console.log("la ficha 2 es del mismo color que la primera");
            var fichaarriba = svg.select(pos33).attr('style');
            var fichaarribacolor = fichaarriba.replace(r, colorficha1);
            fichaarribacolormostrar = fichaarribacolor.replace(r1, "opacity:1");
            svg.select(pos33).attr('style', fichaarribacolormostrar);

            var fichamedio = svg.select(pos22).attr('style');
            var fichamedioblanca = fichamedio.replace(r, "fill:#f7f2f2");
            fichamedioblancapaca = fichamedioblanca.replace(r1, "opacity:0");
            svg.select(pos22).attr('style', fichamedioblancapaca);

            var fichaabajo = svg.select(pos11).attr('style');
            var fichaabajocolor = fichaabajo.replace(r, colorficha1);
            fichaabajocolormostrar = fichaabajocolor.replace(r1, "opacity:1");
            svg.select(pos11).attr('style', fichaabajocolormostrar);

            new_puente = new Object();
            new_puente.color = fichas[0].fill;
            new_puente.ficha1 = pos1;
            new_puente.ficha2 = pos2;
            new_puente.ficha3 = pos3;
            puentes.push(new_puente);
          }
        }

        console.log(puentes);

        // tratamiento de la primera ficha
        var f1 = svg.select(idficha1).attr('style');
        var newStyle = f1.replace(r, colorficha2);
        newStyle = newStyle.replace(r1, "opacity:0");
        svg.select(idficha1).attr('style', newStyle);

        // tratamiento de la segunda ficha
        var f2 = svg.select(idficha2).attr('style');
        var newStyle1 = f2.replace(r, colorficha1);
        newStyle1 = newStyle1.replace(r1, "opacity:1");
        svg.select(idficha2).attr('style', newStyle1);
        var f2 = svg.select(idficha2).attr('style');

        /* // esto es para cuando se rompa el puente borrarlo del array de objetos de puentes
        for(var element in puentes){
          var temp = puentes[element];
          var content = Object.values(temp);
          console.log(content);
          if(content.includes(idficha1)){
            console.log("esta");
          }
        }*/

        svg
          .selectAll('*[id^="ficha"]')   // selecciona todos los elementos que empiezen por el id ficha
          .on("mouseover", function () { }) // funcion para iluminar casillas donde puedes poner las fichas
          .on("click", function () { }) //funcion para seleccionar fichas
          .on("mouseout", function () { });
        lanzar_dados.removeEventListener("click", lanzardados);
      }
    }

    function componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }

    function rgb2hex(orig) {
      var rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+)/i);
      return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : orig;
    }
    /*
    svg
      .selectAll('*[id^="ficha"]')   // selecciona todos los elementos que empiezen por el id ficha
      .on("mouseover", function () { }) // funcion para iluminar casillas donde puedes poner las fichas
      .on("click", function () { }) //funcion para seleccionar fichas
      .on("mouseout", function () { });
    lanzar_dados.removeEventListener("click", lanzardados);
       */

  }

  socket.on("muevoficha", function (fichas) {
    moverfichas(fichas);
  });

  function moverfichas(fichas) {
    var svg = d3.select(document.getElementById("parchis").contentDocument);
    var r = new RegExp(/fill:#([a-f0-9]+)/);
    var r1 = new RegExp(/opacity:(0|1)+/);

    var idficha1 = "#" + fichas[0].id;
    var colorficha1 = "fill:" + fichas[0].fill;
    var idficha2 = "#" + fichas[1].id;
    var colorficha2 = "fill:" + fichas[1].fill;

    var pos3 = idficha1.substr(0, idficha1.length - 1) + "3";
    var pos2 = idficha1.substr(0, idficha1.length - 1) + "2";
    var pos1 = idficha1.substr(0, idficha1.length - 1) + "1";

    if (idficha1 == idficha2) {
      alert("No puedes poner la ficha en el mismo sitio!!!\nTonto!");
    } else if (idficha2 == pos3 || idficha2 == pos2 || idficha2 == pos1) {
      alert("Que pretendes?\nDuplicarte?");
    } else {
      if (idficha1.charAt(idficha1.length - 1) != 2) {
        pos3 = idficha1.substr(0, idficha1.length - 1) + "3";
        pos2 = idficha1.substr(0, idficha1.length - 1) + "2";
        pos1 = idficha1.substr(0, idficha1.length - 1) + "1";

        var fichaarriba = svg.select(pos3).attr('style');
        var fichaarribablanca = fichaarriba.replace(r, "fill:#ffffff");
        var fichaarribablancapaca = fichaarribablanca.replace(r1, "opacity:0");
        svg.select(pos3).attr('style', fichaarribablancapaca);

        var fichamedio = svg.select(pos2).attr('style');
        var fichamediocolor = fichamedio.replace(r, colorficha1);
        var fichamediocolormostrar = fichamediocolor.replace(r1, "opacity:1");
        svg.select(pos2).attr('style', fichamediocolormostrar);

        var fichaabajo = svg.select(pos1).attr('style');
        var fichaabajoblanca = fichaabajo.replace(r, "fill:#ffffff");
        var fichaabajoblancapaca = fichaabajoblanca.replace(r1, "opacity:0");
        svg.select(pos1).attr('style', fichaabajoblancapaca);
      }

      if (idficha2.charAt(idficha2.length - 1) != 2) {
        pos33 = idficha2.substr(0, idficha2.length - 1) + "3";
        pos22 = idficha2.substr(0, idficha2.length - 1) + "2";
        pos11 = idficha2.substr(0, idficha2.length - 1) + "1";
        console.log("La segunda ficha no es la del medio");

        var fichacentral = svg.select(pos22);
        var ocupada = fichacentral.attr('style');

        var color = "";
        for (var i = 30; i < 37; i++) {
          color += ocupada.charAt(i);
        }

        if (color == "#ffffff") { // si es blanca
          console.log("La posición del medio está libre");
          idficha2 = pos22;
        } else if (color != "#ffffff" || (pos33 == fichas[0].fill && pos11 == fichas[0].fill)) {
          console.log("hay un puente y no puedes mover");
          alert("hay un puente, imposible mover");
          idficha2 = idficha1;
        } else if (color == fichas[0].fill) {
          console.log("la ficha 2 es del mismo color que la primera");
          var fichaarriba = svg.select(pos33).attr('style');
          var fichaarribacolor = fichaarriba.replace(r, colorficha1);
          fichaarribacolormostrar = fichaarribacolor.replace(r1, "opacity:1");
          svg.select(pos33).attr('style', fichaarribacolormostrar);

          var fichamedio = svg.select(pos22).attr('style');
          var fichamedioblanca = fichamedio.replace(r, "fill:#f7f2f2");
          fichamedioblancapaca = fichamedioblanca.replace(r1, "opacity:0");
          svg.select(pos22).attr('style', fichamedioblancapaca);

          var fichaabajo = svg.select(pos11).attr('style');
          var fichaabajocolor = fichaabajo.replace(r, colorficha1);
          fichaabajocolormostrar = fichaabajocolor.replace(r1, "opacity:1");
          svg.select(pos11).attr('style', fichaabajocolormostrar);

          new_puente = new Object();
          new_puente.color = fichas[0].fill;
          new_puente.ficha1 = pos1;
          new_puente.ficha2 = pos2;
          new_puente.ficha3 = pos3;
          puentes.push(new_puente);
        }
      }

      console.log(puentes);

      // tratamiento de la primera ficha
      var f1 = svg.select(idficha1).attr('style');
      var newStyle = f1.replace(r, colorficha2);
      newStyle = newStyle.replace(r1, "opacity:0");
      svg.select(idficha1).attr('style', newStyle);

      // tratamiento de la segunda ficha
      var f2 = svg.select(idficha2).attr('style');
      var newStyle1 = f2.replace(r, colorficha1);
      newStyle1 = newStyle1.replace(r1, "opacity:1");
      svg.select(idficha2).attr('style', newStyle1);
      var f2 = svg.select(idficha2).attr('style');

      /* // esto es para cuando se rompa el puente borrarlo del array de objetos de puentes
      for(var element in puentes){
        var temp = puentes[element];
        var content = Object.values(temp);
        console.log(content);
        if(content.includes(idficha1)){
          console.log("esta");
        }
      }*/
    }
  }
  // se ejecutara cuando el rival haga un movimiendo
  // se le para el array de fichasamover


  // pasar los colores de rgba a hexadecimal


  /*// prueba de coger una ficha y ponerla verde
    var a = document.getElementById("parchis");
    var svgDoc = a.contentDocument;
    var circulo11 = svgDoc.getElementById("ficha11-1");
  
    circulo11.addEventListener("mouseover", function () {
      this.style.fill = "green";
      this.style.opacity = 1;
    }, false);
  */
}


