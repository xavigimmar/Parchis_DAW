var socket = io.connect();

socket.on('messages',function(data){
  //console.log(data);
  render(data);
});  

socket.on("actualizartitulo",function(dados){
  document.getElementById('h1').innerHTML = "Parchís " + dados[0] + " " + dados[1];
});  

socket.emit('conectado');
socket.on("hola",function(){
  alert("Hola me he conectado a tu partida");
});
function render(data){
  var html = data.map(function(element, index){
    return(`<div>
              <strong>${element.author}</strong>:
              <em>${element.texto}</em>
            </div>`);
  }).join(" ");

  document.getElementById('messages').innerHTML = html;
}
  
function addMessage(e){
  var mensaje = {
    author: document.getElementById('username').value,
    texto: document.getElementById('texto').value
  }

  socket.emit("new-message",mensaje);
  return false;
}

window.onload = function(){
  var lanzar_dados = document.getElementById('boton');
    
  lanzar_dados.addEventListener("click",function(){
    var numran1 = Math.round(Math.random()*9);
    var numran2 = Math.round(Math.random()*9);
    var dados = Array(numran1,numran2);
    socket.emit("dados",dados);    
  });

  var svg = d3.select(document.getElementById("parchis").contentDocument);
  console.log(svg);

  var fichasamover = [];
  svg
    .selectAll('*[id^="ficha"]')
    .on("click",function(){      
      var id = d3.select(this).attr("id");

      if(fichasamover.length != 2){
        var relleno = rgb2hex(this.style.fill);
        
        if(fichasamover.length == 1){
          var ficha2 = new Object();
          ficha2.id = id;
          ficha2.fill = relleno;
          fichasamover.push(ficha2);
          
          console.log(fichasamover);
        }else{
          if(relleno != "#ffffff"){
            var ficha1 = new Object();
            ficha1.id = id;
            ficha1.fill = relleno;
            fichasamover.push(ficha1);       
          }else{
            console.log("la ficha es blanca");
          }
        } 
      }        
      
      if(fichasamover.length == 2){
        socket.emit("movimiento",fichasamover);
        var mover = moverfichas(fichasamover);
        fichasamover = [];
      }
    });

    function componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }

    function moverfichas(fichas){

      var idficha1 = "#"+fichas[0].id;
      var colorficha1 = "fill:"+fichas[0].fill;
      console.log(colorficha1);
      var idficha2 = "#"+fichas[1].id;
      var colorficha2 = "fill:"+fichas[1].fill;
      console.log(colorficha2);

      var r = new RegExp(/fill:#([a-f0-9]+)/);
      var r1 = new RegExp(/opacity:(0|1)+/);
        
      var f1 = svg.select(idficha1).attr('style');
      console.log("f1 anter: " + f1);
      var newStyle = f1.replace(r,"fill:#ffffff");
          newStyle = f1.replace(r1,"opacity:0"); 
      svg.select(idficha1).attr('style',newStyle); 
      var f1 = svg.select(idficha1).attr('style');
      console.log("f1 despues: " + f1);

      var f2 = svg.select(idficha2).attr('style');
      console.log("f2 anter: " + f2);
      var newStyle1 = f2.replace(r,colorficha1);
          newStyle1 = f2.replace(r1,"opacity:1");
      svg.select(idficha2).attr('style',colorficha1); 
      var f2 = svg.select(idficha2).attr('style');
      console.log("f2 despues: " + f2);
    }

    socket.on("muevoficha", function(fichas){
      moverfichas(fichas);
    });

  var a = document.getElementById("parchis");
  var svgDoc = a.contentDocument;
  var circulo11 = svgDoc.getElementById("ficha11-1");
   
  circulo11.addEventListener("mouseover",function() {
    this.style.fill = "green";
    this.style.opacity = 1;
  }, false);

  function rgb2hex(orig){
    var rgb = orig.replace(/\s/g,'').match(/^rgba?\((\d+),(\d+),(\d+)/i);
    return (rgb && rgb.length === 4) ? "#" +
     ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
     ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
     ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : orig;
   }

   //console.log(rgb2hex("rgba(255, 255, 255)"));
}
  

