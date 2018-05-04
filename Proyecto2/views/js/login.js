//window.onload = function () {
    var enviar = document.getElementById("enviar");

    enviar.addEventListener("click", function () {
        var nombre = document.getElementById("usuario").value;
        var pass = document.getElementById("pass").value;

        $.ajax({
            url: '/login',
            data: { nombre: nombre, pass: pass },
            type: 'GET',

            success: function (json) {
                console.log(json);
            },

            error: function (xhr, status) {
                alert('Ha habido un problema');
            }
        });
    });
//}

