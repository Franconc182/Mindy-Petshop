let mensajeExitoso = document.getElementById("mensajeExitoso");
let botonForm = document.getElementById("botonForm");

botonForm.addEventListener('click', evento => mensajeExito())
function mensajeExito() {
    return mensajeExitoso.innerHTML=`Su mensaje se ha enviado con éxito. ¡Muchas gracias!`

}