var express=require("express");
var routesTienda=require("./rutasTienda/routesTienda.js")
var routesCliente=require("./rutasCliente/routesCliente.js")
var routesREST=require("./rutasREST/routesREST.js")

module.exports=function(servidorExpress){
    servidorExpress.use("/Tienda",routesTienda);
    servidorExpress.use("/Cliente",routesCliente);
    servidorExpress.use("/api",routesREST);
}