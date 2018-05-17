////////////////////////////////////////////////////////////////
//                                                            //
//                        SIGNUP.JS                           //                   
// Descripción: Fichero para pasar al servidor los datos del  //
//              formulario de registro                        //
//                                                            //
////////////////////////////////////////////////////////////////

window.onload = () => {
   
    var registrarse = document.getElementById("register");

    var msgUsuario = document.getElementById("messageUser"),
        msgEmail = document.getElementById("messageEmail"),
        msgPass = document.getElementById("messagePass");

    registrarse.addEventListener("click", registro);

    // MOSTRAR / OCULTAR CONTRASEÑAS
    var showPass = document.getElementById("show-hide-passwd");

    showPass.addEventListener("click", function() {
        var pass = document.getElementById("passwordRegister");
        var pass2 = document.getElementById("passwordRegister2")
        if(pass.type === "password" && pass2.type === "password") {
            pass.type = "text";
            pass2.type = "text";
            showPass.className = "glyphicon glyphicon-eye-close";
        } else {
            pass.type = "password";
            pass2.type = "password";
            showPass.className = "glyphicon glyphicon-eye-open";
        }
    });

    // FUNCIONES

    /* GESTIONAR QUE HACER AL REGISTRARSE */
    function datos(registrarse) {
        var msgRegistro = document.getElementById("mensajeRegistro");

        if(registrarse) { // Si se registra correctamente
            msgRegistro.innerHTML = "<div style=font-size:13px;color:green;text-align:center>Registrado correctamente</div>";
        } else {
            msgRegistro.innerHTML = "<div style=font-size:13px;color:red;text-align:center>Error. El usuario ya existe</div>";
        }
    }

    /* VALIDACIÓN */
    function validarDatos() {
        var usuario = document.getElementById("userRegister").value,
            correo = document.getElementById("emailRegister").value,
            pass = document.getElementById("passwordRegister").value,
            pass2 = document.getElementById("passwordRegister2").value;

        // Mensajes de cada campo
        var msgUsuario = document.getElementById("messageUser"),
            msgCorreo = document.getElementById("messageEmail"),
            msgPass = document.getElementById("messagePass");

        // Test nombre de usuario
        if(usuario == "" || usuario.length == 0 || /^\s+$/.test(usuario)) {
            msgUsuario.innerHTML = '<div style=color:red;margin-left:86px;font-size:11px>Error. El campo usuario no puede estar vacío ni contener solo espacios en blanco</div>';
            document.getElementById("userRegister").focus();
            return false;
        } else if(usuario != usuario.toLowerCase() /*&& usuario != usuario.toUpperCase()*/) {
            msgUsuario.innerHTML = '<div style=color:red;margin-left:86px;font-size:11px>Error. El nombre solo puede estar en minúsculas</div>';
            document.getElementById("userRegister").focus();
            return false;
        }

        // Test correo
        if(correo == "" || correo.length == 0 || !(/\S+@\S+\.\S+/.test(correo))){
            msgCorreo.innerHTML = '<div style=color:red;margin-left:86px;font-size:11px>Error. Debe escribir un correo válido</div>';
            document.getElementById("emailRegister").focus();
			return false;
        }
        
        // Test contraseñas
        if(pass.length != 0 && pass2.length != 0 || pass.length != 0 || pass2.length != 0 /*|| (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(pass) || (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(pass2)*/) {
            if(pass != pass2) {
                msgPass.innerHTML = '<div style=color:red;margin-left:86px;font-size:11px>Error. Las contraseñas no coinciden</div>';
                document.getElementById("passwordRegister").focus();
                document.getElementById("passwordRegister2").focus();
                return false;
            } else if(pass.length < 8 || pass2.length < 8) {
                msgPass.innerHTML = '<div style=color:red;margin-left:86px;font-size:11px>Error. Las contraseñas deben tener mínimo 8 caracteres</div>';
                document.getElementById("passwordRegister").focus();
                document.getElementById("passwordRegister2").focus();
                return false;
            }
        } else {
            msgPass.innerHTML = '<div style=color:red;margin-left:86px;font-size:11px>Error. No puedes dejar la contraseña vacía</div>';
            document.getElementById("passwordRegister").focus();
            document.getElementById("passwordRegister2").focus();
            return false;
        }
        
        return true;
    }

    /* REGISTRO */
    function registro(e) {
        var usuario = document.getElementById("userRegister").value,
            correo = document.getElementById("emailRegister").value,
            pass = document.getElementById("passwordRegister").value,
            pass2 = document.getElementById("passwordRegister2").value;

        // Mensajes de cada campo
        var msgUsuario = document.getElementById("messageUser"),
            msgCorreo = document.getElementById("messageEmail"),
            msgPass = document.getElementById("messagePass");

        if(validarDatos()) { // Si la validación del form es correcta    
            e.preventDefault(); // no redirigir ya que submit lo hace
                
            // Limpiar campos de error
            msgUsuario.innerHTML = "";
            msgCorreo.innerHTML = "";
            msgPass.innerHTML = "";
            //console.log("validación correcta");
            $.ajax({    // AJAX
                url: '/profile',
                data: { usuario: usuario, correo: correo, pass: pass },
                type: 'GET',

                success: function (respuesta) {
                   //console.log('Respuesta: ' + respuesta);
                   datos(respuesta);
                },

                error: function (xhr, status) {
                    console.log('Ha habido un problema con el registro');
                }
            });
        }

        
    }

    

}

