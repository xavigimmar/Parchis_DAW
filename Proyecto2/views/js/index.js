window.onload = () => {
    // FUNCIONES

    /* RECUPERAR USUARIO DE LA URL */
    /*function pasarVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable) {
                alert(pair[1]);
            }
        }
    }*/
    /* COGER ID's HTML */
    var welcome = document.getElementById("welcomeUser");

    /* RECUPERAR USUARIO DE LA URL */
    var query = window.location.search.substring(1); // Devuelve user=nombre
    var nick = query.substr(5,query.length); // Devuelve el nombre de usuario

    var parametros = window.location.search; // Devuelve lo que haya después de index.html, es decir, ?user=nombre

    if(parametros != "") { // Si no está vacío significa que hay un usuario logueado
        welcome.innerHTML = "Bienvenido " + nick + "!";
    } else {
        welcome.innerHTML = "Bienvenido anónimo!";
    }

}