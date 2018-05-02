var socket = io.connect();

socket.on('messages',function(data){
  //console.log(data);
  render(data);
});  

socket.on("actualizartitulo",function(dados){
  document.getElementById('h1').innerHTML = "Parchís " + dados[0] + " " + dados[1];
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

  svg
    .selectAll('*[id^="ficha"]')
    .on("click",function(){
      
      var id = d3.select(this).attr("id");
      console.log(id);
      
    });


  var a = document.getElementById("parchis");
  var svgDoc = a.contentDocument;
  var circulo11 = svgDoc.getElementById("ficha11-1");
   
  circulo11.addEventListener("mouseover",function() {
    this.style.fill = "green";
    this.style.opacity = 1;
  }, false);

}
  

