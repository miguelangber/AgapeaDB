/*
vamos a definir el modelo libro, que se va a mapear contra un documento de la colección libros de MongoDB
*/



var mongoose=require("mongoose");
		

var esquemaLibro=new mongoose.Schema({

    titulo:{
            type: String,
            required: true,
            maxlength: 100
        },
    editorial: {
            type: String,
            required: true,
            maxlength: 100,
            //enum: ["Anaya","RA-MA","prestince-Hall"]
            },
    autor: {
            type: String,
            maxlength: 200
        },
    ISBN: {
            type: String,
            required: true,
            maxlength: 10,
            minlength: 10,
            match: /^[0-9]{10}$/,
            default: "0000000000"
          },
    ISBN13: {
            type: String,
            required: true,
            maxlength: 13,
            minlength: 13,
            match: /^[0-9]{13}$/,
            default: "0000000000000"
        },
    numeroPaginas: {
            type: Number,
            min: 10,
            max: 2000
            },
    precio: {
            type: Number,
            required: true,
            min:1,
            max:10000
        },
    idMateria: {
            type: Number,
            required: true,
           },
    descripcion: {
            type: String
             },
    imagenLibro: {
            type: String,
            required: true,
            validate: (valor)=>{
                if(valor.indexOf("/public/images")!=-1){
                    return false;
                } else {
                    if(new RegExp("^.*\.(png|jpg)$").test(valor)){
                    return true;
                    }
                }
            }
             }
        
});	

module.exports=mongoose.model("Libro",esquemaLibro, "Libros");