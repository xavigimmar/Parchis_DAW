////////////////////////////////////////////////////////////////
//                                                            //
//                        LOGIN.JS                            //                   
// Descripción: Fichero para pasar al servidor los datos del  //
//              formulario de login                           //
//                                                            //
////////////////////////////////////////////////////////////////

window.onload = () => {

    // MOSTRAR / OCULTAR CONTRASEÑA
    // Botón para mostrar la contraseña
    var showPass = document.getElementById("show-hide-passwd");

    showPass.addEventListener("click", function() {
        var pass = document.getElementById("pass");
        
        if(pass.type === "password") {
            pass.type = "text";
            showPass.className = "glyphicon glyphicon-eye-close";
        } else {
            pass.type = "password";
            showPass.className = "glyphicon glyphicon-eye-open";
        }
    });

    var enviar = document.getElementById("enviar");

    enviar.addEventListener("click", login);

    // FUNCIONES

    /* LOGIN */
    function login(e) {
        //e.preventDefault(); // no redirigir ya que submit lo hace
        var nombre = document.getElementById("usuario").value;
        var pass = document.getElementById("pass").value;

        $.ajax({
            url: '/entrar',
            data: { nombre: nombre, pass: pass },
            type: 'GET',

            success: function (json) {
                console.log(json);
                if (json) window.location.href = "/"; 
            },

            error: function (xhr, status) {
                console.log('Ha habido un problema con el login');
            }
        });
    }
}   

