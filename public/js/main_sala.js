var socket = io.connect();

window.onload = function(){

    socket.on("salas",function(salas){
        var div = d3.select("#salas");

        d3.selectAll("p").remove();
        
        for(var elementos of salas){
            var chart = div.append("p")
            .attr("id", elementos)
            .html(elementos);
        }  

        d3.selectAll("p").each(function (e,i){
            d3.select(this).on("click",function(){
                var join = d3.select(this).attr("id");
                console.log(join);
                socket.emit("room",join);
            });
        });
    });

    
    /*
    p
        .selectAll('*[id^="sala"]')
        .on("click", function(){
            sala = d3.select(this).attr("id");
            console.log(sala);
        });
    
       console.log(body);
    */  
}