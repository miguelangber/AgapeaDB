var express = require("express");
var router = express.Router();

/* definir las posibles rutas de Cliente:
    login, registro, panel de usuario
*/


router.route("/login")
    .get((req,res,next)=>{
        // muestras los datos de tu perfil

    })
    .post((req,res,next)=>{
        // envio de datos de credenciales...

    });


router.route("/registro")
    .get((req,res,next)=>{
        // muestras el formulario del registro
        var _listaProvincias=[]; // array de Strings formato "xx-nombre provincia"

        res.render("Cliente/registro.hbs",{layout: null});
    })
    .post((req,res,next)=>{
        /* recojo los datos de registro y los almaceno en mongodb
           y genero token de sesion... además mandar EMAIL de activacion de cuenta
        */

    });


router.route("/miPerfil")
    .get((req,res,next)=>{
        // muestras los datos de tu perfil
    
    })
    .post((req,res,next)=>{
        // envio de datos para modificar perfil...
    
    });


router.route("/misDatosDeEnvio")
        .get((req,res,next)=>{
            // recuperas todas la direcciones existentes y las muestras

        })
        .post((req,res,next)=>{
            // envio de datos para modificar las direccione o añades una nueva...
        });

module.exports=router;