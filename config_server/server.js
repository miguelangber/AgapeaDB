/* modulo de configuracion de un servidor web en NOSEJS que sirve tanto vistas como da acceso a servicio REST

// tengo acceso a los parametros de la IMMED que se encarga de crear el module

//modulo para crear servidor web
var http=require("http");
//modulo para poder tener acceso al sistema de ficheros del servidor 
var fs=require("fs");

//usando las clases de ese módlo, 
//1º creamos un servidor que escuche peticiones clientes
//2º provesar y gestionar las peticiones de eseos clientes y devolver una respuesta, mediante funciones callback 
//que admiten dos argumentos:
/*



http.createServer(
    (req,res)=>{
        /* console.log("un cliente se acaba de conectar...");
        console.log("LA PETICION");
        console.log(req);

        res.write("bienvenido a mi servidor nodejs...");
        res.end(); 
        //tenfo que detectar en la url que me solicita el cliente
        //1º si el método es GET o POST
        //2º detectar el recurso que me  solicita para devolverselo
        switch(req.method){
            case "GET":{
                /* console.log("El cliente me ha solicitado: ");
                console.log(req.url);
                res.write("Hola te lo mandamos....") 
                //tenemos que leer el fichero que nos solicita el cliente y mandarlo en la respuesta
                //var _vistas="C:\\Users\\34693\\Desktop\\personal\\Clase\\AgapeaNODE\\public\\vistas\\";

                var _directorio="";
                var _contenttype="";
                if (new RegExp("\.html$").test(req.url)) {
                    _directorio = __dirname.replace("config_server","public\\vistas");
                    _contenttype = "text/html";
                } else {
                    _directorio = __dirname.replace("config_server","public\\");
                    if(new RegExp("\.css$").test(req.url)){
                        _contenttype = "text/css";
                    }else if(new RegExp("\.js$").test(req.url)){
                        _contenttype = "application/javascript";
                    }
                }
                console.log(_directorio);
                fs.readFile(_directorio + req.url.replace("/","\\"),
                (errores,datos)=>{
                    if(!errores){
                        console.log(datos);
                        res.setHeader("Content-Type",_contenttype);
                        res.statusCode=200;
                        res.write(datos);
                        res.end();
                    }else{
                        console.log(errores);
                        res.statusCode=404;
                        res.write("Error tremendo");
                        res.end();
                    }
                })
                break;
            }
            case "POST": {
                break;
            }
        }
    }

).listen(3000);
*/

var express=require("express");
//modulos middleware
var cookieparser=require("cookie-parser");// modilo de cookies
var bodyparser=require("body-parser");// modulo de datos post
var hbs=require("express-handlebars");// modulo generador de vistas

var router=express.Router();


//--------------------------------SERVIDOR WEB EXPRESS------------------------------------

var servidor=express(); //....nos creamos el servidor
//.... configuracion PIPELINE
servidor.use(cookieparser());
servidor.use(bodyparser.urlencoded({ extended: false}));
servidor.use(bodyparser.json());

servidor.set("views",__dirname.replace("config_server","Views"));
servidor.engine("hbs",hbs.create(
        {
            extname:"hbs",
            defaultLayout:"layout",
            layoutsDir:servidor.get("views") + "/layouts",
            partialsDir: servidor.get("views") + "/Partials"
        }
    ).engine
); //configuracion del ViewEngine (generador de vistas) HandleBars

//.... fin de PIPELINE

servidor.use("/public", 
                express.static(__dirname.replace("config_server","public"),
                {
                    extensions: ["htm","html","css","js"],
                    index: true,
                    maxAge:"1d"
                }
                ));
router.get("/Cliente/registro.html",(req,res,next)=>{
    console.log("peticion recibida del cliente: "+ req.url);
    res.status(200).render("registro.html");
});
servidor.use(router);

servidor.listen(3000);
//---------------------------------------------------------------------------------------

console.log("servidor express escuchando en puerto 3000.....");
