var socket = io.connect();

window.onload = function () {

    socket.on("salas", function (salas) {
        var inputs = d3.select("#ajugar");

        d3.selectAll("input").remove();

        for (var elementos of salas) {
            var chart = inputs.append("input")
                .attr("id", elementos)
                .attr("class", "botonjugar")
                .attr("type", "submit")
                .attr("name", elementos)
                .attr("value", elementos)
                .html(elementos);
        }
    
        socket.on("deshabilitarboton", function (sala) {
            d3.select(sala)
                .style("pointer-events","none")
                .style("opacity","0.4");
        });
    
        socket.on("habilitarboton", function (sala) {
            d3.select(sala)
                .style("pointer-events","")
                .style("opacity","");
        });

        var sala1 = document.getElementById("Sala1");
        sala1.addEventListener("click", function () {
            var sesion = sessionStorage.setItem("sala", "Sala1");
        });

        var sala2 = document.getElementById("Sala2");
        sala2.addEventListener("click", function () {
            var sesion = sessionStorage.setItem("sala", "Sala2");
        });

        var sala3 = document.getElementById("Sala3");
        sala3.addEventListener("click", function () {
            var sesion = sessionStorage.setItem("sala", "Sala3");
        });

        var sala4 = document.getElementById("Sala4");
        sala4.addEventListener("click", function () {
            var sesion = sessionStorage.setItem("sala", "Sala4");
        });

        /*
        var input = d3.select(document.getElementsByTagName("input"));
        input.on("click",function(){
            console.log(input);
            var valor = d3.select(this).attr("value");
            localStorage.setItem("sala", valor);
        });
        */
    });
}