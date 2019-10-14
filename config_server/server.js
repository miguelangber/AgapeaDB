var express=require("express");
var mongoose=require("mongoose"); // acceso a datos cotra mongodb

//modulos middleware
var cookieparser=require("cookie-parser"); //modulo de cookies
var bodyParser=require("body-parser"); //modulo datos POST
var hbs=require("express-handlebars"); //modulo generador VISTAS

var router=express.Router(); //modulo enrutamiento

//importamos modelos
var Libro=require("../Models/libro.js");

//--------------------------- SERVIDOR WEB EXPRESS ----------------
var servidor=express();

//....configuracion PIPELINE....
servidor.use(cookieparser());
servidor.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
servidor.use(bodyParser.json()); // parse application/json

servidor.set("views", __dirname.replace("config_server","Views"));
servidor.engine("hbs", hbs.create(
        {
            extname:"hbs",
            defaultLayout:"miplantilla",
            layoutsDir: servidor.get("views") + "/Layouts",
            partialsDir: servidor.get("views") + "/Partials",
            helpers: {}
        }
    ).engine

); //configuracion del ViewEngine (generador de vistas) Handlebars

servidor.use("/public",
             express.static(__dirname.replace("config_server","public"),
                        {
                            extensions: ["htm","html","css","js"],
                            index: false,
                            maxAge: "1d"
                        })
             );
// ....empezamos con el modulo de enrutamiento...
// 1º)rutas para gestionar la parte de tienda-libros
router.param("Materia", (req,res,next,Materia)=>{
    req.Materia=Materia;
    next(); // siga procesando el siguiente modulo de rutas...
});

router.get("/Tienda/Libros/:Materia", (req,res,next)=>{
    // recuperar de la BD el array de libros, y pasarselo a la vista...
    if (req.Materia == undefined) req.Materia=0;
    Libro.find({"IdMateria":req.Materia},(err, respuesta)=>{
        
        if(err){
            res.statusCode(400).render("error interno...");
            console.log(err);
        } else{
            console.log(respuesta);
            res.render("Tienda/Libros.hbs",{listaLibros: respuesta});
        }// cierre if err
    });//cierre callback y cierre de Libro.find
}); // cierre del router get

router.get("Tienda/VistaLibro/:paramTienda",(req,res,next)=>{
// nose qie se hace aquí
})

// 2º)rutas para gestionar la parte de cliente (registro,login,....)

servidor.use(router);

// ....fin de PIPELINE.....

servidor.listen(3000);
//--------------------------------------------------------------------
console.log("...servidor express escuchando en puerto 3000....");



// ----------------CONEXIÓN AL SERVIDOR CDE DATOS MONGODB----------------------------
mongoose.connect('mongodb://localhost:27017/AgapeaDB',
             {useNewUrlParser: true,
                useUnifiedTopology: true},
			 (err)=>{
				if(err){
					console.log("error al intentar conectar al servidor MongoDB")
					throw new Error(err);
				}else {
					console.log("...conectados al servidor BD de MongoDB...");
				}
			 })
