////////////////////////////////////////////////////////////////
//                                                            //
//                      SIGNUP.JS                             //
//        Archivo .js para la conexión y registro de          //
//              usuarios con MongoDB (Mongoose)               //
//                                                            //
////////////////////////////////////////////////////////////////

window.onload = () => {
    var mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost/users_parchis', function(err) {
        if(err) throw err;
        console.log('Conectado a MongoDB');
    });
}


