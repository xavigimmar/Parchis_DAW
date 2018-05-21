window.onload = () => {
    
    var usuario = sessionStorage.getItem("user"); // Recuperar nombre de usuario del session Storage

    if(usuario == null) { // Si no está logueado lo redirige a la página principal
        location.href = "/";
    }

    ////////////////////////////
    
    // FUNCIONES
    function mostrarDatos(datosUsu) {
        var divDatos = document.getElementById("datosUsuario"),
            divEstadisticas = document.getElementById("estadisticasPersonales"),
            contenido = document.getElementById("contenidoPerfil");

        divDatos.addEventListener("click", function() {
            contenido.style.height = "300px";
            divEstadisticas.style.background = "grey";
            this.style.background = "#9ecef3";
            contenido.innerHTML = "<h2 id='tituloDatos'>DATOS</h2><br /><br /><b>Usuario:</b> " + datosUsu[0] + "<br /><b>Email:</b> " + datosUsu[1];
            //contenido.innerHTML += "<br /><br /><div class='btn btn-primary'>Borrar cuenta</div>"
        });

        divEstadisticas.addEventListener("click", function() {
            divDatos.style.background = "grey";
            this.style.background = "#9ecef3";
            contenido.innerHTML = "Estadísticas";
    
        });
    
    }

    // AJAX para recuperar datos del usuarios
    $.ajax({
        url: '/datosUsuario',
        data: { nombre: usuario },
        type: 'GET',

        success: function (resultado) {
            mostrarDatos(resultado);
        },

        error: function (xhr, status) {
            console.log('Ha habido un problema al recuperar los datos');
        }
    });

}