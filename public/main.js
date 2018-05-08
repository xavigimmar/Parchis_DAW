var socket = io.connect();

// renderizado de los mensajes del chat
socket.on('messages', function (data) {
  //console.log(data);
  render(data);
});

// Incustacion de los dados aleatorios en el titulo
socket.on("actualizartitulo", function (dados) {
  document.getElementById('h1').innerHTML = "Parchís " + dados[0] + " " + dados[1];
});

// mensaje de alerta de cuando se conecta un usuario a la partida
socket.emit('conectado');
socket.on("hola", function () {
  alert("Hola me he conectado a tu partida");
});

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

// carga de las funciones del js
window.onload = function () {
  // coger el boton del dato
  var lanzar_dados = document.getElementById('boton');

  var dados;
  // funcion para generar los dados
  lanzar_dados.addEventListener("click", function () {
    var numran1 = Math.round(Math.random() * 5) + 1;
    var numran2 = Math.round(Math.random() * 5) + 1;
    dados = Array(numran1, numran2);
    socket.emit("dados", dados);
  });

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
    .on("click", seleccionarfichas)
    .on("mouseout", descolorearcasillas);

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
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
        console.log(num);
        if (isNaN(num)) {
          num = idficha.charAt(10) + idficha.charAt(11);
        }
        console.log(num);

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

  function seleccionarfichas() {
    if (typeof dados != "undefined") {
      // variable para el id de las fichas
      var id = d3.select(this).attr("id");

      // generar array para pas fichas a mover
      if (fichasamover.length != 2) {
        var relleno = rgb2hex(this.style.fill);

        // condicion si el array ya tiene una ficha
        if (fichasamover.length == 1) {
          /*
          var solo1 = "#ficha" + temp1 + "-1";
          var solo2 = "#ficha" + temp2 + "-1";
          var solo3 = "#ficha" + temp3 + "-1";
          //if(id != )
          console.log(solo1);
          */
          var ficha2 = new Object();
          ficha2.id = id;
          ficha2.fill = relleno;
          fichasamover.push(ficha2);

          //console.log(fichasamover);
        } else {
          // control de la posicion donde la quieres poner
          if (relleno != "#ffffff") {
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
      if (fichasamover.length == 2) {
        socket.emit("movimiento", fichasamover);
        var mover = moverfichas(fichasamover);
        fichasamover = [];
      }
    }
  }

  // funcion para mover las fichas
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
        pos3 = idficha2.substr(0, idficha2.length - 1) + "3";
        pos2 = idficha2.substr(0, idficha2.length - 1) + "2";
        pos1 = idficha2.substr(0, idficha2.length - 1) + "1";

        var fichacentral = svg.select(pos2);
        var ocupada = fichacentral.attr('style');

        var color = "";
        for (var i = 30; i < 37; i++) {
          color += ocupada.charAt(i);
        }

        if (color == "#ffffff") {
          idficha2 = pos2;
        }
        if (color == "#D64949") {
          idficha2 = idficha1;
          alert("no puedes pasar");
        }
        if (color == fichas[0].fill) {
          var fichaabajo = svg.select(pos1).attr('style');
          var fichaabajocolor = fichaabajo.replace(r, colorficha1);
          fichaabajocolormostrar = fichaabajocolor.replace(r1, "opacity:1");
          svg.select(pos3).attr('style', fichaabajocolormostrar);

          var fichamedio = svg.select(pos2).attr('style');
          var fichamedioblanca = fichamedio.replace(r, "fill:#ffffff");
          fichamedioblancapaca = fichamedioblanca.replace(r1, "opacity:0");
          svg.select(pos2).attr('style', fichamedioblancapaca);

          idficha2 = pos1;

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
  socket.on("muevoficha", function (fichas) {
    moverfichas(fichas);
  });

  // pasar los colores de rgba a hexadecimal
  function rgb2hex(orig) {
    var rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+)/i);
    return (rgb && rgb.length === 4) ? "#" +
      ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : orig;
  }

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


