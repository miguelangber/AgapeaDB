var express = require("express");
var router = express.Router();


//importamos modelos
var Libro=require("../../../Models/libro");
var Pedido=require("../../../Models/pedido")


// 1º)rutas para gestionar la parte de tienda/libros
router.param("paramTienda", (req,res,next,paramTienda)=>{
    req.paramTienda=paramTienda;
    next(); // siga procesando el siguiente modulo de rutas...
});
router.get("/Tienda/VistaLibro/:paramTienda",(req,res,next)=>{
    // recuperar de la BD el libro, y pasarselo a la vista
    Libro.findOne({"ISBN": req.paramTienda},(err,respuesta)=>{
        if(err){
            res.statusCode(400).render("Error interno...")
            console.log(err);
        } else {
            //var miLibro = new Libro();
            //miLibro=respuesta;

            res.render("Tienda/VistaLibro.hbs",{libro: respuesta});
        }// cierre if err
    });//cierre callback y cierre de Libro.find
}); // cierre del router get

router.get("/Tienda/Libros/:paramTienda", (req,res,next)=>{
    // recuperar de la BD el array de libros, y pasarselo a la vista...
    if (req.paramTienda == undefined) req.paramTienda=0;
    Libro.find({"IdMateria": req.paramTienda},(err, respuesta)=>{
        if(err){
            res.statusCode(400).render("error interno...");
            console.log(err);
        } else{
            res.render("Tienda/Libros.hbs",{listaLibros: respuesta});
        }// cierre if err
    });//cierre callback y cierre de Libro.find
}); // cierre del router get

router.get("/Tienda/Carrito/:paramTienda", (req,res,next)=>{
    //recuuperar de la BD el libro con el ISBN que me pasan por la url
    //añadirlo a la variable de sesion PEDIDO
    /* 
        hay que comprobar:
            - si es el primer libro del pedido, no existe la variable de sesion hay que crearla 
                y añadir el libro a la misma
            - si ya existe pedido, hay que comprrobar que el libro no existe en el pedido, si ya existe
                se incrementa en 1 su cantidad
                
    */
   console.log();
   console.log();
   console.log();
   console.log("Entrando en el route.get del carrito")
   var _isbn=req.paramTienda;
   Libro.findOne({"ISBN": _isbn},(err,datos)=>{
        if (!err) {
            var _pedido;
            //console.log(req.session.pedidoUsuario); // <--------- ¿¿PORQUE ES INDEFINIDO?? PREGUNTAR
            if (!req.session.pedidoUsuario) { 
                // no hay pedido aun
                _pedido = new Pedido();
                _pedido.idPedido="";
                _pedido.nifCliente=req.sessionID; // tendriamos que cogerlo de la variabvle de sesion del cliente logeado
                _pedido.fechaPedido=new Date(Date.now()).toUTCString();
                _pedido.listaLibros.push({libro:datos,cantidad:1});
                _pedido.estadoPedido="ENPREPARACION";
                _pedido.tipoGastosEnvio="PENINSULA";

                _pedido.save((errinsert,result)=>{}); // insert del pedido en mongoDB

                req.session.pedidoUsuario=_pedido;
            } else {
                // hay pedido, comprobamos si tiene el libro
                _pedido=req.session.pedidoUsuario;
                // tengo que comprobar que en el pedido existe o no el ISBN del libro que quiere el cliente comprar
                
                var _libropedido = _pedido.listaLibros.find((el)=>{return el.libro.ISBN==_isbn});

                if(_libropedido){
                    _libropedido.cantidad=_libropedido.cantidad + 1;
                    console.log();
                    console.log("libropedido incrementado: "+_libropedido.cantidad);
                } else {
                    //no se encuentra, lo añado a lista de libros y añado nueva en listaCantidades
                    _pedido.listaLibros.push({libro:datos,cantidad:1});
                }
                req.session.pedidoUsuario=_pedido;
            }
            
            res.render('Tienda/Pedido.hbs',{ layout: null, 
                                             pedido: _pedido
                                        });
        } else {
            
        }
   });
});


module.exports = router;