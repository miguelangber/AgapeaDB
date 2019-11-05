

var mongoose=require("mongoose");

var esquemaProvincia=mongoose.Schema({

    CodPro:{
        type: Number,
        required: true},
    NombreProvincia:{
        type: String,
        required: true},
})


module.exports=mongoose.model("Provincia",esquemaProvincia, "Provincias");