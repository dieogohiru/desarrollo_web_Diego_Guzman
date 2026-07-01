const validarNombreComentario = (nombre) => nombre && nombre.trim().length >= 3 && nombre.trim().length <= 80 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre);
const validarTextoComentario = (texto) => texto && texto.trim().length >= 5;

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.seccion-comentarios').forEach(seccion => {
        const actividadId = seccion.dataset.actividadId;
        cargarComentarios(actividadId, seccion);
    });
});

function cargarComentarios(actividadId, seccion) {
    const contenedorLista = seccion.querySelector('.lista-comentarios');
    
    fetch(`/actividades/${actividadId}/comentarios`)
        .then(response => response.json())
        .then(comentarios => {
            contenedorLista.innerHTML = '';
            
            if (comentarios.length === 0) {
                contenedorLista.innerHTML = '<p>No hay comentarios.</p>';
                return;
            }

            comentarios.forEach(c => {
                contenedorLista.innerHTML += `
                    <div class="comentario-item">
                        <strong>${c.nombre}</strong> - <small>${c.fecha}</small>
                        <p class="comentario-texto">${c.texto}</p>
                    </div>
                `;
            });
        })
        .catch(err => console.error("Error al cargar comentarios:", err));
}

function enviarComentario(event, actividadId) {
    event.preventDefault(); 

    const form = event.target;
    const inputNombre = form.querySelector('.input-nombre');
    const inputTexto = form.querySelector('.input-texto');
    const mensajeError = form.querySelector('.mensaje-error');

    let hayErrores = false;

    if (!validarNombreComentario(inputNombre.value)) {
        inputNombre.style.borderColor = "red";
        if (!document.getElementById(`err-nombre-${actividadId}`)) {
            const span = document.createElement("span");
            span.id = `err-nombre-${actividadId}`;
            span.textContent = "El nombre debe tener entre 3 y 80 letras.";
            span.style.color = "red";
            span.style.display = "block";
            inputNombre.insertAdjacentElement("afterend", span);
        }
        hayErrores = true;
    } else { 
        inputNombre.style.borderColor = ""; 
        if (document.getElementById(`err-nombre-${actividadId}`)) document.getElementById(`err-nombre-${actividadId}`).remove();
    }

    if (!validarTextoComentario(inputTexto.value)) {
        inputTexto.style.borderColor = "red";
        if (!document.getElementById(`err-texto-${actividadId}`)) {
            const span = document.createElement("span");
            span.id = `err-texto-${actividadId}`;
            span.textContent = "El comentario debe tener al menos 5 caracteres.";
            span.style.color = "red";
            span.style.display = "block";
            inputTexto.insertAdjacentElement("afterend", span);
        }
        hayErrores = true;
    } else { 
        inputTexto.style.borderColor = ""; 
        if (document.getElementById(`err-texto-${actividadId}`)) document.getElementById(`err-texto-${actividadId}`).remove();
    }

    if (hayErrores) return;

    const datos = {
        nombre: inputNombre.value.trim(),
        texto: inputTexto.value.trim()
    };

    fetch(`/actividades/${actividadId}/comentarios`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            mensajeError.textContent = data.error;
            mensajeError.style.display = "block";
        } else {
            inputNombre.value = '';
            inputTexto.value = '';
            mensajeError.style.display = "none";
            
            const seccion = form.closest('.seccion-comentarios');
            cargarComentarios(actividadId, seccion);
        }
    })
    .catch(err => console.error("Error al enviar:", err));
}