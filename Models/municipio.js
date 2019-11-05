

var mongoose=require("mongoose");

var esquemaMunicipio=mongoose.Schema({

    CodPro:{
        type: Number,
        required: true},

    CodMun:{
        type: Number,
        required: true},

    DC:{
        type: Number,
        required: true},

    NombreMunicipio:{
        type: String,
        required: true},
})


module.exports=mongoose.model("Municipio",esquemaMunicipio, "Municipios");