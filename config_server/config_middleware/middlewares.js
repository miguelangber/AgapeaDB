var express=require("express");

//modulos middleware
var cookieparser=require("cookie-parser"); //modulo de cookies
var bodyParser=require("body-parser"); //modulo datos POST
var hbs=require("express-handlebars"); //modulo generador VISTAS
var session=require("express-session"); // modulo para crear variables de sesion con formato cookies
//var routes=require("..config_routing/routes.js")

module.exports=function(servidorExpress){
    //....configuracion PIPELINE....
    servidorExpress.use(cookieparser());
    servidorExpress.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
    servidorExpress.use(bodyParser.json()); // parse application/json

    servidorExpress.use(session({
        maxAge:3600000,
        secret:"valorCifradoCookiesSession"
        //store: Memory 
                        /*lo suyo sería almacenarlas dentro de MongoDataBase
                        importar paquete connect-mongo y definir en esta propiedad la coleccion 
                        donde se almacenan las cookies*/
    })); // configurar las variables de sesión
   
    
    servidorExpress.set("views", __dirname.replace("config_server\\config_middleware","Views"));
    servidorExpress.engine("hbs", hbs.create(
        {
            extname:"hbs",
            defaultLayout:"miplantilla",
            layoutsDir: servidorExpress.get("views") + "/Layouts",
            partialsDir: servidorExpress.get("views") + "/Partials",
            helpers: {}
        }
    ).engine); //configuracion del ViewEngine (generador de vistas) Handlebars
    
    // ....empezamos con el modulo de enrutamiento...
    servidorExpress.use("/public",
    express.static(__dirname.replace("config_server\\config_middleware","public"),
            {
                extensions: ["htm","html","css","js"],
                index: false,
                maxAge: "1d"
            })
    );
}

