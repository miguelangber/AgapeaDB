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
        type: String, required: true
    },
    nifCliente:{
        type: String, 
        required: true, 
        maxlength:9, 
        minlength:9, 
        match: /^[0-9]{8}[A-Z]$/
    },
    fechaPedido:{
        type: Date, 
        required: true
    },
    listaLibros: {type:Array, required: true},
    /*
    listaLibros:{
        type: Array, 
        required: true,
        validate: (arr)=>{
            arr.find(element => {
                
                var bValidation;
                if (eleme) {
                    
                }
                return 
            });
        }          
    },
    
    listaISBNs:{
        type:Array,
        required: true
    },
    listaCantidades:{
        type: Array, 
        required: true,
        validate: (valor)=>{
            if (valor<=0 || valor>500) {
                return false; // no dejo comprar mas de 500 unidades
            } else {
                
            }
        }
    },
    */
    tipoGastoEnvio:{
        type: String, 
        required: true
    },
    estadoPedido:{
        type: String,
        required: true
    }
});


module.exports=mongoose.model("Pedido",esquemaPedido, "Pedidos");