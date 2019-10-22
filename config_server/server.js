var express=require("express");		// servidor express
var mongoose=require("mongoose");	// acceso a datos cotra mongodb

//--------------------------- SERVIDOR WEB EXPRESS ----------------
var servidor=express();

//	middleweres
var middle =require("./config_middleware/middlewares.js");
middle(servidor);


//	routings
var routing =require("./config_routing/routes.js");
routing(servidor);

servidor.listen(3000,()=>{console.log("...servidor express escuchando en puerto 3000....");});
//--------------------------------------------------------------------

// ----------------CONEXIÓN AL SERVIDOR CDE DATOS MONGODB----------------------------
mongoose.connect('mongodb://localhost:27017/AgapeaDB',
            {
				useNewUrlParser: true,
				useUnifiedTopology: true
			},
			 (err)=>{
				if(err){
					console.log("error al intentar conectar al servidor MongoDB")
					throw new Error(err);
				}else {
					console.log("...conectados al servidor BD de MongoDB...");
				}
			 })