var socket = io.connect('http://localhost:8080',{'forceNew':true});

socket.on('messages',function(data){
  console.log(data);
  render(data);
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
