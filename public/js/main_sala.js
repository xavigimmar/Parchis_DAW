var socket = io.connect();

window.onload = function(){

    socket.on("salas",function(salas){
        var inputs = d3.select("#ajugar");

        d3.selectAll("input").remove();
        
        for(var elementos of salas){
            var chart = inputs.append("input")
            .attr("class", "botonjugar")
            .attr("type", "submit")
            .attr("name", elementos)
            .attr("value", elementos)
            .html(elementos);
        }  
        console.log("AAAAA");
        d3.selectAll("input").each(function (e,i){
            d3.select(this).on("click",function(){
                var sala = d3.select(this).attr("name");
                console.log("name de la sala: " + sala);
                socket.emit("room",sala);
            });
        });
        console.log("BEEEE");
    });
}