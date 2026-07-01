window.enviarEvaluacion = function(idActividad) {
    if (localStorage.getItem("evaluado-" + idActividad)) {
        alert("Ya has calificado esta actividad. ¡Solo se permite una evaluación!");
        return;
    }

    const selector = document.getElementById("select-nota-" + idActividad);
    if (!selector) return;
    
    const valorNota = selector.value;

    fetch("http://127.0.0.1:8080/api/actividades/" + idActividad + "/evaluar?valor=" + valorNota, { 
        method: 'POST' 
    })
    .then(res => {
        if (!res.ok) throw new Error("Status error: " + res.status);
        return res.json();
    })
    .then(data => {
        if (data && data.nuevoPromedio !== undefined) {
            document.getElementById("nota-" + idActividad).innerText = Number(data.nuevoPromedio).toFixed(1);
            
            localStorage.setItem("evaluado-" + idActividad, "true");

            selector.disabled = true;
            const boton = document.querySelector(`button[onclick="window.enviarEvaluacion(${idActividad})"]`);
            if (boton) {
                boton.disabled = true;
                boton.innerText = "Ya Evaluado";
                boton.classList.add("btn-limpiar"); 
            }

            alert("Nota guardada, Nuevo promedio: " + Number(data.nuevoPromedio).toFixed(1));
        }
    })
    .catch(err => {
        console.error(err);
        alert("Error en el servidor: " + err.message);
    });
};

function resaltar(texto, patron) {
    if (!patron) return texto;
    const regex = new RegExp("(" + patron + ")", 'gi');
    return texto.replace(regex, '<mark style="background-color: yellow; font-weight: bold; padding: 0 2px; border-radius: 2px;">$1</mark>');
}

window.ejecutarBusqueda = function(textoParam) {
    const textoInput = (textoParam !== undefined) ? textoParam.trim() : document.getElementById('inputBusqueda').value.trim();
    const contenedor = document.getElementById('resultadosBusqueda');

    if (textoInput.length === 0) { contenedor.innerHTML = ''; return; }
    if (textoInput.length < 3) return; 
    
    contenedor.innerHTML = '<div class="indicador-pagina espaciado-boton">Buscando...</div>';
    
    fetch("http://127.0.0.1:8080/api/actividades/buscar?texto=" + encodeURIComponent(textoInput))
        .then(response => {
            if (!response.ok) throw new Error('Error en el servidor');
            return response.json();
        })
        .then(actividades => {
            contenedor.innerHTML = ''; 

            if (!actividades || actividades.length === 0) {
                contenedor.innerHTML = '<div class="alert alert-error espaciado-boton">No se encontraron resultados.</div>';
                return;
            }

            actividades.forEach(act => {
                const nombreMiembro = act.miembro ? act.miembro.nombre : 'Sin nombre';
                const nombreComuna = (act.miembro && act.miembro.comuna) ? act.miembro.comuna.nombre : 'Sin comuna';
                const promedio = act.promedioInicial !== null ? Number(act.promedioInicial).toFixed(1) : '-';
                const yaVoto = localStorage.getItem("evaluado-" + act.id) === "true";

                let htmlCard = '<div class="actividad-card">';
                htmlCard += '<h3 class="actividad-titulo">' + resaltar(act.nombre, textoInput) + '</h3>';
                
                htmlCard += '<p><strong>Miembro:</strong> ' + nombreMiembro + '</p>';
                htmlCard += '<p><strong>Tipo:</strong> ' + act.tipo + ' | <strong>Comuna:</strong> ' + resaltar(nombreComuna, textoInput) + '</p>';
                htmlCard += '<p><strong>Día:</strong> ' + act.dia + ' - <strong>Hora:</strong> ' + act.horaInicio + '</p>';
                htmlCard += '<p>' + resaltar(act.descripcion || 'Sin descripción', textoInput) + '</p>';
                
                htmlCard += '<p><strong>Nota actual:</strong> <span id="nota-' + act.id + '" class="indicador-pagina">' + promedio + '</span></p>';

                htmlCard += '<div class="formulario-filtros">';
                
                htmlCard += '<select id="select-nota-' + act.id + '" ' + (yaVoto ? 'disabled' : '') + ' class="select-comuna">';
                htmlCard += '<option value="1">1</option><option value="2">2</option><option value="3">3</option>';
                htmlCard += '<option value="4">4</option><option value="5">5</option><option value="6">6</option>';
                htmlCard += '<option value="7">7</option></select>';
                
                if (yaVoto) {
                    htmlCard += '<button class="button btn-limpiar" disabled>Ya Evaluado</button>';
                } else {
                    htmlCard += '<button class="button" onclick="window.envaluacion(' + act.id + ')">Evaluar</button>';
                }
                htmlCard += '</div>';
                htmlCard += '</div>';
                
                contenedor.innerHTML += htmlCard;
            });
        })
        .catch(error => {
            console.error('Error:', error);
            contenedor.innerHTML = '<div class="alert alert-error espaciado-boton">Error al conectar con el servidor.</div>';
        });
}