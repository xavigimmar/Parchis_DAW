/* Eventos */
window.onload = function() {

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

    

}


