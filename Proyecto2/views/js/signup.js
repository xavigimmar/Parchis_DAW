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
    //registrarse.addEventListener("click", validarDatos);

    if(msgUsuario != "" || msgEmail != "" || msgPass != "") { // Si no está vacío
        msgUsuario.style.background = "#ff6868";
        msgUsuario.style.fontSize = "11px";
        msgUsuario.style.borderRadius = "3px";
        //msgUsuario.style.width = "400px";
        //msgUsuario.style.padding = "5px";
        msgUsuario.style.width = "500px";
    } else {
        msgUsuario.style.background = "none";
        msgUsuario.style.fontSize = "none";
        msgUsuario.style.borderRadius = "none";
        msgUsuario.style.width = "0";
        //msgUsuario.style.padding = "5px";
        msgUsuario.innerHTML = "";
    }

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

        // Test usuario
        if(usuario == "" || usuario.length == 0 || /^\s+$/.test(usuario)) {
            msgUsuario.innerHTML = 'Error. El campo usuario no puede estar vacío ni contener solo espacios en blanco';
            document.getElementById("userRegister").focus();
            return false;
        }

        // Test correo
        if(correo == "" || correo.length == 0 || !(/\S+@\S+\.\S+/.test(correo))){
            msgCorreo.innerHTML = 'Error. Debe escribir un correo válido';
            document.getElementById("emailRegister").focus();
			return false;
        }
        
        // Test contraseñas
        //if(pass.length != 0 && pass2.length != 0) {
            //console.log(pass);
            if(pass != pass2) {
                msgPass.innerHTML = 'Error. Las contraseñas no coinciden';
                document.getElementById("passwordRegister").focus();
                document.getElementById("passwordRegister2").focus();
                return false;
            }
        //}
        
        return true;
    }

    /* COMPROBACIÓN DE NICK DE USUARIO */
    /*function comprobarNick(usuario) {
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("parchis");
            dbo.collection("usuarios").find({"user":usuario}, function(err, result) {
              if (err) throw err;
              console.log(result);
              db.close();
            });
        }); 
    }*/

    /* REGISTRO */
    function registro(e) {
        var usuario = document.getElementById("userRegister").value,
            correo = document.getElementById("emailRegister").value,
            pass = document.getElementById("passwordRegister").value,
            pass2 = document.getElementById("passwordRegister2").value;

        if(validarDatos()) { // Si la validación del form es correcta
            //if(pass == pass2) { // Si las contraseñas coinciden    
            //e.preventDefault(); // no redirigir ya que submit lo hace
            //if(mongo.comprobarNick(usuario)) {
                console.log("validación correcta");
                $.ajax({
                    url: '/profile',
                    data: { usuario: usuario, correo: correo, pass: pass },
                    type: 'GET',
    
                    success: function (json) {
                        /*if(json.respuesta == true) {
                            console.log('Todo correcto');
                        } else {
                            console.log("hay algo incorrecto");
                        }*/
                        console.log("hola");
                    },
    
                    error: function (xhr, status) {
                        console.log('Ha habido un problema con el registro');
                    }
                });

                //console.log("Las contraseñas coinciden");
            /*} else {
                console.log('El nombre de usuario ya existe');
            }*/
    
                //document.getElementById("message").innerHTML = "coinciden";
            //} else {
                //console.log("Las contraseñas no coinciden");
            //}
        }
        
    }

    

}

