var express=require("express");
var routesTienda=require("./rutasTienda/routesTienda.js")
//var routesCliente=require("./rutasTienda/routesCliente.js")

module.exports=function(servidorExpress){
    servidorExpress.use(routesTienda);
    //servidorExpress.use("/Cliente",routesCliente);
}