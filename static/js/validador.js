async function cargarComunas(regionId) {
    const selectComuna = document.getElementById('comuna');
    if (!selectComuna) return;

    selectComuna.innerHTML = '<option value="">Cargando...</option>';
    selectComuna.disabled = true;

    if (!regionId) {
        selectComuna.innerHTML = '<option value="">Seleccione primero una región...</option>';
        return;
    }

    const response = await fetch(`/get_comunas/${regionId}`);
    const comunas = await response.json();

    selectComuna.innerHTML = '<option value="">Seleccione Comuna...</option>';
    comunas.forEach(comuna => {
        const option = document.createElement("option");
        option.value = comuna.id;
        option.textContent = comuna.nombre;
        selectComuna.appendChild(option);
    });
    selectComuna.disabled = false;
}

const validarNombre = (nombre) => nombre && nombre.trim().length >= 3 && nombre.trim().length <= 255 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre);
const validarEmail = (email) => email && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 80;
const validarTelefono = (telefono) => /^\d{8}$/.test(telefono.replace(/\s/g, ''));

document.addEventListener("DOMContentLoaded", () => {

    const formMiembro = document.getElementById("form-miembro");
    if (formMiembro) {
        const nombreInp = document.getElementById("nombre");
        const telInp = document.getElementById("telefono");
        const emailInp = document.getElementById("email"); 
        const comuna = document.getElementById("comuna"); 

        formMiembro.addEventListener("submit", function(e) {
            let mensajeError = "";
    
            if (!validarNombre(nombreInp.value)) {
                mensajeError += "- Nombre inválido.\n";
                nombreInp.style.borderColor = "red";
                if (!document.getElementById("err-nombre")) {
                    const span = document.createElement("span");
                    span.id = "err-nombre";
                    span.textContent = "Hubo un error, revise el contenido en este campo";
                    span.style.color = "red";
                    span.style.display = "block";
                    nombreInp.insertAdjacentElement("afterend", span);
                }
            } else { 
                nombreInp.style.borderColor = ""; 
                if (document.getElementById("err-nombre")) document.getElementById("err-nombre").remove();
            }

            if (!validarEmail(emailInp.value)) {
                mensajeError += "- Email inválido.\n";
                emailInp.style.borderColor = "red";
                if (!document.getElementById("err-email")) {
                    const span = document.createElement("span");
                    span.id = "err-email";
                    span.textContent = "Hubo un error, revise el contenido en este campo";
                    span.style.color = "red";
                    span.style.display = "block";
                    emailInp.insertAdjacentElement("afterend", span);
                }
            } else { 
                emailInp.style.borderColor = ""; 
                if (document.getElementById("err-email")) document.getElementById("err-email").remove();
            }

            if (!validarTelefono(telInp.value)) {
                mensajeError += "- El teléfono debe tener exactamente 8 números.\n";
                telInp.style.borderColor = "red";
                if (!document.getElementById("err-telefono")) {
                    const span = document.createElement("span");
                    span.id = "err-telefono";
                    span.textContent = "Hubo un error, revise el contenido en este campo";
                    span.style.color = "red";
                    span.style.display = "block";
                    telInp.closest(".input-prefijo").insertAdjacentElement("afterend", span);
                }
            } else { 
                telInp.style.borderColor = ""; 
                if (document.getElementById("err-telefono")) document.getElementById("err-telefono").remove();
            }

            if (!comuna || comuna.value === "") {
                mensajeError += "- Debe seleccionar una comuna.\n";
                if(comuna) {
                    comuna.style.borderColor = "red";
                    if (!document.getElementById("err-comuna")) {
                        const span = document.createElement("span");
                        span.id = "err-comuna";
                        span.textContent = "Hubo un error, revise el contenido en este campo";
                        span.style.color = "red";
                        span.style.display = "block";
                        comuna.insertAdjacentElement("afterend", span);
                    }
                }
            } else { 
                comuna.style.borderColor = ""; 
                if (document.getElementById("err-comuna")) document.getElementById("err-comuna").remove();
            }

            if (mensajeError !== "") {
                e.preventDefault();
                alert("Atención:\n" + mensajeError);
            }
        });
    }

    const formActividad = document.getElementById("form-actividad");
    if (formActividad) {
        const tipoAct = document.getElementById("tipo-act");
        const nombreAct = document.getElementById("nombre_act");
        const horaInp = document.getElementById("hora_inicio");
        const duraInp = document.getElementById("duracion");
        const fotoInp = document.getElementById("foto");

        formActividad.addEventListener("submit", function(e) {
            let mensajeError = "";
            const archivos = fotoInp?.files;

            if (!tipoAct || tipoAct.value === "") {
                mensajeError += "- Debe seleccionar una categoría.\n";
                tipoAct.style.borderColor = "red";
                if (!document.getElementById("err-tipo")) {
                    const span = document.createElement("span");
                    span.id = "err-tipo";
                    span.textContent = "Hubo un error, revise el contenido en este campo";
                    span.style.color = "red";
                    span.style.display = "block";
                    tipoAct.insertAdjacentElement("afterend", span);
                }
            } else {
                tipoAct.style.borderColor = "";
                if (document.getElementById("err-tipo")) document.getElementById("err-tipo").remove();
            }

            if (!nombreAct || nombreAct.value.trim().length < 3) {
                mensajeError += "- Nombre de actividad inválido.\n";
                nombreAct.style.borderColor = "red";
                if (!document.getElementById("err-nombreact")) {
                    const span = document.createElement("span");
                    span.id = "err-nombreact";
                    span.textContent = "Hubo un error, revise el contenido en este campo";
                    span.style.color = "red";
                    span.style.display = "block";
                    nombreAct.insertAdjacentElement("afterend", span);
                }
            } else {
                nombreAct.style.borderColor = "";
                if (document.getElementById("err-nombreact")) document.getElementById("err-nombreact").remove();
            }

            if (!horaInp || horaInp.value === "") {
                mensajeError += "- Hora de inicio obligatoria.\n";
                horaInp.style.borderColor = "red";
                if (!document.getElementById("err-hora")) {
                    const span = document.createElement("span");
                    span.id = "err-hora";
                    span.textContent = "Hubo un error, revise el contenido en este campo";
                    span.style.color = "red";
                    span.style.display = "block";
                    horaInp.insertAdjacentElement("afterend", span);
                }
            } else {
                horaInp.style.borderColor = "";
                if (document.getElementById("err-hora")) document.getElementById("err-hora").remove();
            }

            if (!duraInp || duraInp.value === "") {
                mensajeError += "- Hora de término obligatoria.\n";
                duraInp.style.borderColor = "red";
                if (!document.getElementById("err-dura")) {
                    const span = document.createElement("span");
                    span.id = "err-dura";
                    span.textContent = "Hubo un error, revise el contenido en este campo";
                    span.style.color = "red";
                    span.style.display = "block";
                    duraInp.insertAdjacentElement("afterend", span);
                }
            } else {
                duraInp.style.borderColor = "";
                if (document.getElementById("err-dura")) document.getElementById("err-dura").remove();
            }

            if (!archivos || archivos.length === 0 || archivos.length > 3) {
                mensajeError += "- Archivos inválidos (máx 3).\n";
                fotoInp.style.borderColor = "red";
                if (!document.getElementById("err-foto")) {
                    const span = document.createElement("span");
                    span.id = "err-foto";
                    span.textContent = "Hubo un error, revise el contenido en este campo";
                    span.style.color = "red";
                    span.style.display = "block";
                    fotoInp.insertAdjacentElement("afterend", span);
                }
            } else {
                fotoInp.style.borderColor = "";
                if (document.getElementById("err-foto")) document.getElementById("err-foto").remove();
            }

            if (mensajeError !== "") {
                e.preventDefault();
                alert("Atención:\n" + mensajeError);
            }
        });
    }

});
