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
    /* FUNCIÓN PARA MENSAJE DE ERROR SI NO SE LOGUEA CORRECTAMENTE */
    function datos(logueo) {
        var msgLogin = document.getElementById("mensajeLogin"),
            usuario = document.getElementById("usuario").value;

        //console.log('Usuario en funcion datos: ' + usuario);

        if(logueo) { // Si se loguea correctamente
            //location.href = "../index.html?user=" + usuario; // Redirecciona a la página principal pasando el nombre de usuario por url
            location.href = "/";
            //localStorage.setItem("user", usuario); // Asignar el nombre de usuario a un local Storage para poder usarlo en dif páginas
            sessionStorage.setItem("user", usuario); // Asignar el nombre de usuario a un session Storage para poder usarlo en dif páginas
        } else { // Si no se ha logueado correctamente da mensaje de error
            msgLogin.innerHTML = "<div style=font-size:11px;color:red;margin-bottom:10px>Usuario o contraseña incorrectos</div>";
        }
    }

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
                datos(json); // Función que gestiona que hacer cuando se intenta loguear
            },

            error: function (xhr, status) {
                console.log('Ha habido un problema con el login');
            }
        });
    }

    
}   

