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
 * Se utilizan promesas porque las funciones de MongoDB son 
 * asíncronas, es decir, no esperan respuesta, y ejecutan
 * inmediatamente después lo que tengan. Al utilizar Promesas
 * se convierten en síncronas y puedes devolver respuestas de las
 * mismas.
 */

// CONEXIÓN A MONGODB
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

// INSERTAR DATOS USUARIO COMPROBANDO ANTES SI YA EXISTE O NO
exports.insertarMongo = function (nombre, correo, password) {
    var insertar = true;
    return new Promise(function(respuesta, error) { // Creación de promesa
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("parchis"), // Base de datos
                coleccion = dbo.collection("usuarios"); // Colección
    
            var myobj = { user: nombre, email: correo, pass: password };
            // Comprobación de usuario (si existe o no)
            coleccion.find({ "user": nombre }).toArray(function (err, result) {
                var resultado = result[0]; // Coge el primer resultado del array
                if (!resultado) { // Si no encuentra el usuario lo inserta
                    coleccion.insertOne(myobj, function (err, res) {
                        if (err) return false;
                        //console.log("Insertado");
                        db.close();
                    });
                } else {
                    //console.log("El usuario ya existe");
                    insertar = false;
                }
                respuesta(insertar); // Devuelve el boolean
            });
        });
    });
}

