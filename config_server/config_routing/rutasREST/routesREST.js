var express = require("express");
var router = express.Router();

//----importamos modelos ... para manejar moonfoose contra base de datos
var Provincia=require("../../../Models/provincia");
var Municipio=require("../../../Models/municipio");


//---------------definimos RUTAS SERVICIOREST a la escucha---------------------
router.get("Municipios/:codpro",(req,res,next)=>{
    /* como es peticion a servicio rest devuelvo JSON!!, en este caso devulevo:
        [ { codmun: xx, nombremun: ...  }, { codmun: xx, nombremun: ...  }, .....] */

        Municipio.find({"CodPro" : codpro},(err,datos)=>{
            if (!err) {
                var _miuni
            }
        })
    });


module.exports=router;