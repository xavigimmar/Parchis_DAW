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
 */

// CONEXIÓN A MONGODB
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var id_usuario = 0;

// INSERTAR DATOS USUARIO
exports.insertarMongo = function(nombre, correo, password) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("parchis");
        //id_usuario = (dbo.collection("usuarios").count() + 1);
        id_usuario = dbo.collection("usuarios").count;
        console.log(id_usuario);
        var myobj = { _id: id_usuario, user: nombre, email: correo, pass: password };
        dbo.collection("usuarios").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("Insertado");
            db.close();
        });
    });
}

