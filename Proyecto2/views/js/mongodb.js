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
var a;
exports.insertarMongo = function (nombre, correo, password) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("parchis"), // Base de datos
            coleccion = dbo.collection("usuarios"); // Colección

        var myobj = { user: nombre, email: correo, pass: password };
        coleccion.find({ "user": nombre }).toArray(function (err, result) {
            var caca = result[0];
            a = "9999";
            if (!caca) {
                coleccion.insertOne(myobj, function (err, res) {
                    if (err) return false;
                    //console.log("Insertado");
                    db.close();
                    a = true;
                });
            } else {
                console.log("El usuario ya existe");
                a = false;
            }
        });
    });
    a = true;
    console.log("la vida es una tombola: " + a);
}

exports.comprobarNick = function (nombre) {
    MongoClient.connect(url, function (err, db) {
        if (err) return false;
        var dbo = db.db("parchis"), // Base de datos
            coleccion = dbo.collection("usuarios"); // Colección

        /*coleccion.find({"user":nombre}).toArray(function(err, re) {
            return re;
        });*/

        var nick = coleccion.find({ "user": nombre });
        nick.count(function (err, num) {
            console.log("contador de registros: " + num);
        });
    });



}

