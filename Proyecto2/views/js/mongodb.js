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

// BCRYPT (para encriptar la contraseña)
var bcrypt = require('bcrypt-nodejs');

// CONEXIÓN A MONGODB
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

// INSERTAR DATOS USUARIO COMPROBANDO ANTES SI YA EXISTE O NO Y ENCRIPTANDO LA CONTRASEÑA
exports.insertarMongo = function (nombre, correo, password) {
    var insertar = true; // Boolean que indica si se inserta con éxito o no
    return new Promise(function(respuesta, error) { // Creación de promesa
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("parchis"), // Base de datos
                coleccion = dbo.collection("usuarios"); // Colección
    
            var pass_encrypted = bcrypt.hashSync(password); // Encriptar la contraseña de forma síncrona, para poder devolverla
            //console.log('Contraseña ' + password + ' encriptada: ' + pass_encrypted);
            var myobj = { user: nombre, email: correo, pass: pass_encrypted };
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

// LOGIN DE USUARIO
exports.login = function (nombre, password) {
    var entrar = true; // Boolean que indica si se loguea con éxito o no
    return new Promise(function(respuesta, error) { // Creación de promesa
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("parchis"), // Base de datos
                coleccion = dbo.collection("usuarios"); // Colección

            // Comprobación de usuario (si existe o no)
            coleccion.find({ "user": nombre }).toArray(function (err, result) {
                var resultado = result[0]; // Coge el primer resultado del array
                if (resultado != undefined) { // Si encuentra el usuario comprueba la contraseña
                    /*console.log('Existe el usuario: ' + resultado.user);
                    for(var i in result) {
                        console.log(result[i]);
                    }*/
                    //console.log(resultado.pass);
                    //console.log(password);
                    if(!bcrypt.compareSync(password, resultado.pass)) { // Si no coincide la contraseña
                        entrar = false;
                    }
                } else { // No existe el usuario
                    //console.log(result[0]);
                    entrar = false;
                }
                //console.log('Loguearse: ' + entrar);
                
                respuesta(entrar); // Devuelve el boolean
            });
        });
    });
}

// RECUPERAR DATOS DEL USUARIO PASADO POR PARÁMETRO
exports.recuperarDatos = function (nombre) {
    var datos = [];
    //var entrar = true; // Boolean que indica si se loguea con éxito o no
    return new Promise(function(respuesta, error) { // Creación de promesa
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("parchis"), // Base de datos
                coleccion = dbo.collection("usuarios"); // Colección

            // Comprobación de usuario (si existe o no)
            coleccion.find({ "user": nombre }).toArray(function (err, result) {
                var resultado = result[0]; // Coge el primer resultado del array
                if (resultado != undefined) { // Si encuentra el usuario comprueba la contraseña
                    //console.log('Email: ' + result[0].email);
                    datos.push(result[0].user);
                    datos.push(result[0].email);
                } /*else { // No existe el usuario
                    console.log(result[0]);
                    entrar = false;
                }*/
                
                respuesta(datos); // Devuelve el boolean
            });
        });
    });
}
