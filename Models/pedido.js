/*
vamos a definir el modelo "pedido", que se va a mapear contra un documento de la colección "pedidos" de MongoDB


propiedades que va a tener :
    - idPedido
    - nifCliente
    - fechaPedido
    - listaLibros
    - listaCantidades
    - tipoGastosEnvio
    - estadoPedido
*/


var mongoose=require("mongoose");

var esquemaPedido=new mongoose.Schema({
    idPedido:{
        type: String, required
    },
    nifCliente:{
        type: String, 
        required, 
        maxlength:9, 
        minlength:9, 
        match: /^[0-9]{8}[A-Z]$/
    },
    fechaPedido:{
        type: Date, 
        required
    },
    listaLibros:{
        type: Array, 
        required/*,
        validate: (arr)=>{
            arr.find(element => {
                /*
                var bValidation;
                if (eleme) {
                    
                }
                return 
            });
        }
        
                */
    },
    listaCantidades:{
        type: Array, 
        required,
        validate: (valor)=>{
            if (valor<=0 || valor>500) {
                return false; // no dejo comprar mas de 500 unidades
            } else {
                
            }
        }
    },
    tipoGastoEnvio:{
        type: String, 
        required
    },
    estadoPedido:{
        type: String,
        required
    }
});


module.exports=mongoose.model("Pedido",esquemaPedido, "Pedidos");