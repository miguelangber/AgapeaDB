

var cajas=Array.from(document.getElementsByTagName("input")).filter( (elem)=>{
    return (elem.getAttribute("type")=="text" || 
    elem.getAttribute("type")=="password") ? true : false} );


function Cliente (log, email , pass , nom , ape ){
    this.user = log || "";
    this.mail = email || "";
    this.password = pass || "";
    this.name = nom || "";
    this.lastname = ape || "";
    this.adress = ape || "";
    this.country = ape || "";
}

var _validationForm = {
    /*Conjunto de expresiones Regulares que validan*/
    user:/^[A-Za-z]{1}[A-Za-z0-9]{3,14}$/,
    password:/^(?=\w+\d)(?=\w+[A-Z])(?=\w+[a-z])\S{8,16}$/,
    repassword:/^(?=\w+\d)(?=\w+[A-Z])(?=\w+[a-z])\S{8,16}$/,
    mail:/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    name:/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
    lastname:/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
    adress:/^[\D\d]{5,75}$/,
    country:/^[\D]{3,20}$/,
    other_text:/.*/,
    /************************************************/

    clickBtn: (ev)=> {
        for (const elem of cajas) {
            var ide = elem.id;
            if((_validationForm[ide].test(elem.value))&&(elem.value!="")){
                console.log("Campo " +ide+ " validado");
            }else{
                console.log("Error en campo: "+ide);
                elem.focus();
                elem.setAttribute("style","background:pink;")
                ev.preventDefault();
                return;
            }
          }

        var _checkbox = document.getElementById("conditions").checked;
        if (!_checkbox) {
            window.alert("Debes aceptar los términos legales");
            ev.preventDefault();
        return;
        }

        var _cliente = new Cliente();

        Object.getOwnPropertyNames(_cliente).forEach((prop)=>{
            _cliente[prop]=document.getElementById(prop).value;
        })
        console.log(_cliente);
    }
}

var _handlersInputs={
    mouseDownDos: (ev)=>{
        cajas.forEach((elem)=>{
            if (elem.value!="") {
                elem.setAttribute("style","background:white");
            }
        })
    }
    ,
    /* mouseDown: (ev)=> {
        var _firstVacia=cajas.find( (caj)=>{ return caj.value==""; });
        if( _firstVacia != undefined ){
            _firstVacia.focus();
            _firstVacia.setAttribute("style","background:yellow");

            ev.preventDefault(); //<---cancelo el mousedown...
            
        } //cierre if _firstVacia
    }
    , */
    keyDown: (ev)=>{
        if(ev.keyCode==9){
            var control1 = _validationForm[ev.target.id].test(ev.target.value);
            var control2 =(ev.target.value=="");
            if (!control1||control2) {
                ev.target.setAttribute("style","background:pink");
            }
        }
    }
    /* keyDown: (ev)=>{
        var codTecla=ev.keyCode;
    //console.log("tecla: " + ev.key + "...con codigo: " + codTecla);

        //..cuando pulso el tab pierde el foco...
    if(codTecla==9){
        if(ev.target.value==""){
                ev.target.setAttribute("style","background:yellow");

                ev.preventDefault(); //<-- este evento si es cancelable

        } else {
                ev.target.setAttribute("style","background:white");
        } // cierre if contenido caja...
        } //cierre if codtecla
    } */
        
} //cierre objeto

cajas.forEach( (elem)=> {
    elem.addEventListener("keydown", _handlersInputs.keyDown);
    elem.addEventListener("mousedown", _handlersInputs.mouseDown);
    elem.addEventListener("mousedown", _handlersInputs.mouseDownDos);
    });
   
var _boton = document.getElementById("signUpBtn");
_boton.addEventListener("click", _validationForm.clickBtn); 

