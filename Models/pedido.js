/*
vamos a definir el modelo "pedido", que se va a mapear contra un documento de la colección "pedidos" de MongoDB


propiedades que va a tener :
    - idPedido
    - nifCliente
    - fechaPedido
    - listaLibros
    - tipoGastosEnvio
    - estadoPedido
*/


var mongoose=require("mongoose");

var esquemaPedido=new mongoose.Schema({
    id:{
        type: String, required: true
    },
    nifCliente:{
        type: String, 
        required: true, 
        maxlength:9, 
        minlength:9, 
        match: /^[0-9]{8}[A-Z]$/
    },
    fecha:{
        type: Date, 
        required: true
    },
    listaLibros: {
        type:Array, 
        required: true
    },
    tipoGastoEnvio:{
        type: String, 
        required: true
    },
    estado:{
        type: String,
        required: true
    },
    tipoGastosEnvio:{
        type:String,
        required:true
    }
});


module.exports=mongoose.model("Pedido",esquemaPedido, "Pedidos");