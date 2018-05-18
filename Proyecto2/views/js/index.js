window.onload = () => {

    // FUNCIONES

    /* VENTANA OPCIONES */
    function opciones() {
        
    }

    //////////////////////////////////////
    /* INSERTAR UN NODO DESPUÉS DE OTRO */
    function insertAfter(e, i) { // e -> nodo tras el que se quiere insertar otro, i -> el nodo que se quiere insertar
        if (e.nextSibling) {
            e.parentNode.insertBefore(i, e.nextSibling);
        } else {
            e.parentNode.appendChild(i);
        }
    }

    /* COGER ID's HTML */
    var welcome = document.getElementById("welcomeUser");

    /* RECUPERAR USUARIO DE LA URL */
    /*var query = window.location.search.substring(1); // Devuelve user=nombre
    var nick = query.substr(5,query.length); // Devuelve el nombre de usuario

    var parametros = window.location.search;*/ // Devuelve lo que haya después de index.html, es decir, ?user=nombre

    //var nick = localStorage.getItem("user"); // Coger el nombre de usuario
    var nick = sessionStorage.getItem("user"); // Coger el nombre de usuario del session Storage

    console.log('Nombre de usuario en index.html: ' + nick);

    //if(parametros != "") { // Si no está vacío significa que hay un usuario logueado
    if (nick != undefined) { // Si no está undefined (vacío) significa que hay un usuario logueado
        welcome.innerHTML = "Bienvenido/a <span id='nombreUsuario'><a href='/perfil'>" + nick + "</a></span>!";

        // Creación del nuevo link
        var cerrarSesion = document.createElement("a"),
            contenido = document.createTextNode("Cerrar sesión");
            cerrarSesion.appendChild(contenido);
            cerrarSesion.setAttribute("href", "salir"),
            cerrarSesion.setAttribute("id", "cerrarSesion"),
            cerrarSesion.setAttribute("data-toggle", "tooltip"),
            cerrarSesion.setAttribute("title", "Perfil");

        var parentDiv = document.getElementById("containerOpciones");

        parentDiv.appendChild(cerrarSesion);

    } else {
        welcome.innerHTML = "Bienvenido/a <span id='nombreUsuario'>anónimo/a</span>!";

        // Creación del nuevo link
        var iniciarSesion = document.createElement("a"),
            contenido = document.createTextNode("Iniciar sesión");
            iniciarSesion.appendChild(contenido);
            iniciarSesion.setAttribute("href", "/login"),
            iniciarSesion.setAttribute("id", "iniciarSesion");

        var parentDiv = document.getElementById("containerOpciones");

        parentDiv.appendChild(iniciarSesion);


        // Creación del nuevo link
        var registro = document.createElement("a"),
            contenido = document.createTextNode("Regístrate");
        registro.appendChild(contenido);
        registro.setAttribute("href", "/signup"),
            registro.setAttribute("id", "registrarse");

        var div = document.getElementById("iniciarSesion");

        var parentDiv = div.parentNode;

        parentDiv.insertBefore(registro, div.nextSibling);
    }

    /* DESHABILITAR BOTÓN DE JUGAR SI NO SE ESTÁ LOGUEADO */
    //if(parametros == "") { // si no devuelve ningún usuario
    if (nick == undefined) { // si no devuelve ningún usuario
        document.getElementById("opcionJugar").setAttribute("class", "deshabilitado"); // Añade al li la clase deshabilitado definida en el css
    }

    // DEFINICIÓN DE EVENTOS
    var opciones = document.getElementById("opciones");

    opciones.addEventListener("click", opciones);


}