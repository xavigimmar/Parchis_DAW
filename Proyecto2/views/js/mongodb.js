////////////////////////////////////////////////////////////////
//                                                            //
//                        MONGODB.JS                          //                   
// Descripción: Fichero que define las funciones CRUD         //
//              de MongoDB que maneja el servidor             //
//                                                            //
////////////////////////////////////////////////////////////////

/* 
 * Nota: exports es para exportar la función y que la pueda coger
 * el servidor
 * Variable id_usuario: Le pondrá un id al usuario para que no se
 * lo asigne automáticamente MongoDB, este id será el total de 
 * registros que haya en la colección + 1 para no repetir ningún id
 */

// CONEXIÓN A MONGODB
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//var id_usuario = 0; // Inicializar el id del usuario para que MongoDB no le asigne uno al azar

// INSERTAR DATOS USUARIO
exports.insertarMongo = function (nombre, correo, password) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("parchis"), // Base de datos
            coleccion = dbo.collection("usuarios"); // Colección

        /*var registros = coleccion.find({}); // Encuentra todos los registros guardados para poder hacer un contador de cuántos hay
        registros.count(function(error, numDocs) {
            id_usuario = numDocs + 1; // Contador de registros + 1
            //console.log("Contador de registros: " + id_usuario);

            var myobj = { _id: id_usuario, user: nombre, email: correo, pass: password };
            coleccion.insertOne(myobj, function(err, res) {
                if (err) throw err;
                //console.log("Insertado");
                db.close();
            });
        });*/
        var myobj = { /*_id: id_usuario,*/ user: nombre, email: correo, pass: password };
        coleccion.insertOne(myobj, function (err, res) {
            if (err) throw err;
            //console.log("Insertado");
            db.close();
        });
    });
}

