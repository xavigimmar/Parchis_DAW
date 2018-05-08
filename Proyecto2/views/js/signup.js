////////////////////////////////////////////////////////////////
//                                                            //
//                        SIGNUP.JS                           //                   
// Descripción: Fichero para pasar al servidor los datos del  //
//              formulario de registro                        //
//                                                            //
////////////////////////////////////////////////////////////////

window.onload = () => {
    var registrarse = document.getElementById("register");

    registrarse.addEventListener("click", registro);

    // FUNCIONES
    function registro(e) {
        var usuario = document.getElementById("userRegister").value,
            correo = document.getElementById("emailRegister").value,
            pass = document.getElementById("passwordRegister").value,
            pass2 = document.getElementById("passwordRegister2").value;

        if(pass == pass2) { // Si las contraseñas coinciden
            //e.preventDefault(); // no redirigir ya que submit lo hace
            $.ajax({
                url: '/profile',
                data: { usuario: usuario, correo: correo, pass: pass },
                type: 'GET',

                success: function (json) {
                    console.log(json);
                },

                error: function (xhr, status) {
                    console.log('Ha habido un problema');
                }
            });
            console.log("Las contraseñas coinciden");

            document.getElementById("message").innerHTML = "coinciden";
        } else {
            alert("Las contraseñas no coinciden");
        }
    }

}

