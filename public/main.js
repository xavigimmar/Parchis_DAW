var socket = io.connect('http://localhost:8080',{'forceNew':true});

socket.on('messages',function(data){
  console.log(data);
  render(data);
});

/*
socket.on('test',function(test){
  document.getElementById('h1').innerHTML += test;
});
*/

var dados = Array(0,1);
socket.emit("dados",dados);

socket.on("actualizartitulo",function(dado0){
  document.getElementById('h1').innerHTML += " " + dado0;
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
