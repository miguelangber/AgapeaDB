/*
vamos a definir el modelo libro, que se va a mapear contra un documento de la colección libros de MongoDB
*/



var mongoose=require("mongoose");
		

var esquemaLibro=new mongoose.Schema({

    Titulo:{
            type: String,
            required: true,
            maxlength: 100,
            default: "0000000000"
        },
    Editorial: {
            type: String,
            required: true,
            maxlength: 100,
            //enum: ["Anaya","RA-MA","prestince-Hall"]
            },
    Autor: {
            type: String,
            maxlength: 200
        },
    ISBN: {
            type: Number,
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
    NumeroPaginas: {
            type: Number,
            min: 10,
            max: 2000
            },
    Precio: {
            type: Number,
            required: true,
            min:1,
            max:10000
        },
    IdMateria: {
            type: Number,
            required: true,
           },
    Descripcion: {
            type: String
             },
    FicheroImagen: {
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