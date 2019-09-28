

var cajas = Array.from(document.getElementsByTagName("input")).filter( (elem)=>{
    return ((elem.getAttribute("type")=="text" || 
    elem.getAttribute("type")=="password") &&
    !elem.disabled) ? true : false} );
var radios = Array.from(document.getElementsByTagName("input")).filter( (elem)=>{
    return elem.getAttribute("type")=="radio" ? true : false } );


function Cliente (log, email , pass , nom , ape , dir, pais, cnc, ads){
    this.user = log || "";
    this.mail = email || "";
    this.password = pass || "";
    this.name = nom || "";
    this.lastname = ape || "";
    this.adress = dir || "";
    this.country = pais || "";
    this.htk = cnc || ""
    this.ads = ads || false;
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

    
    inputValidation(element){
        
        if (element.id=="repassword" && document.getElementById("password").value!=document.getElementById("repassword").value) {
            console.log("Error en campo: repassword");
            element.setAttribute("style","background:pink;")
            document.getElementById("alert_"+element.id).style.display="inline-block";
            return false;
        }else if(element.id=="other_text"&&!document.getElementById("radio_other").checked){
            console.log("Campo " +element.id+ " validado");
            element.setAttribute("style","background:white;")
            document.getElementById("alert_"+element.id).style.display="none";
            return true;

        }else if((_validationForm[element.id].test(element.value))&&(element.value!="")){
            console.log("Campo " +element.id+ " validado");
            element.setAttribute("style","background:white;")
            document.getElementById("alert_"+element.id).style.display="none";
            return true;
        }else{
            console.log("Error en campo: "+element.id);
            element.setAttribute("style","background:pink;")
            document.getElementById("alert_"+element.id).style.display="inline-block";
            //element.style.background="url(../imagenes/icon20190712.png)";
            //element.style.background-position="url(../imagenes/icon20190712.png)";
            return false;
        }
    }
    
    ,

    clickBtn: (ev)=> {
        for (const elem of cajas) {
            if(!_validationForm.inputValidation(elem)){
                elem.focus();
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
            if (prop=="ads") {
                _cliente[prop]=document.getElementById(prop).checked;
            } else if(prop=="htk"){
                radios.forEach((elem)=>{
                    if (elem.checked) {
                        if (elem.id=="radio_other") {
                            _cliente[prop]=document.getElementById("other_text").value;
                        } else {
                            _cliente[prop]=elem.value;
                        }
                    }
                });
            }else {
                _cliente[prop]=document.getElementById(prop).value; //este es el caso normal que v a ir con la mayoría
            }
        })
        console.log(_cliente);
    }
}

var _handlersInputs={
    blur: (ev)=>{
        
        if(!_validationForm.inputValidation(ev.target)){
            return;
        }
        
    }
    ,
    keyDown: (ev)=>{
        if(ev.keyCode==9){
            var control1 = _validationForm[ev.target.id].test(ev.target.value);
            var control2 =(ev.target.value=="");
            if (!control1||control2) {
                ev.target.setAttribute("style","background:pink");
            }
        }
    }
    ,
    clickRadios: (ev)=>{
        if (ev.target.id=="radio_other") {
            document.getElementById("other_text").style.display="block";
        } else {
            document.getElementById("other_text").style.display="none";
            document.getElementById("other_text").value=""
        }
    }
} //cierre objeto

cajas.forEach( (elem)=> {
    elem.addEventListener("keydown", _handlersInputs.keyDown);
    elem.addEventListener("blur", _handlersInputs.blur);
});
radios.forEach((elem)=>{
    elem.addEventListener("click", _handlersInputs.clickRadios);
})
   
document.getElementById("signUpBtn").addEventListener("click", _validationForm.clickBtn);






