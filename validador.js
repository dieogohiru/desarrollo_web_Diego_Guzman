const listaMiembros = [
    {nombre: 'Laura Moreno', email: 'laura.m@ug.uchile.cl', tipo: 'estudiante_post', actividad: 'recreativa', actNom: 'Club de Ajedrez'},
    {nombre: 'Beatriz Pérez', email: 'beatriz.p@ug.uchile.cl', tipo: 'estudiante_post', actividad: 'tecnologica', actNom: 'Taller de Python'},
    {nombre: 'Pedro Gonzalez', email: 'pedro.g@ug.uchile.cl', tipo: 'academico', actividad: 'artistica', actNom: 'Coro Docente'},
    {nombre: 'Rosa Diaz', email: 'rosa.d@ug.uchile.cl', tipo: 'estudiante_pre', actividad: 'deportiva', actNom: 'Selección de Vóleibol'},
    {nombre: 'Diego Muñoz', email: 'diego.m@ug.uchile.cl', tipo: 'estudiante_pre', actividad: 'recreativa', actNom: 'Juegos de Mesa'},
    {nombre: 'Elena Alvarez', email: 'elena.a@ug.uchile.cl', tipo: 'funcionario', actividad: 'deportiva', actNom: 'Yoga Vespertino'},
    {nombre: 'Miguel Sánchez', email: 'miguel.s@ug.uchile.cl', tipo: 'academico', actividad: 'social', actNom: 'Mentorías Estudiantiles'},
    {nombre: 'Javier Martinez', email: 'javier.m@ug.uchile.cl', tipo: 'funcionario', actividad: 'tecnologica', actNom: 'Soporte TI'},
    {nombre: 'Ana Romero', email: 'ana.r@ug.uchile.cl', tipo: 'estudiante_pre', actividad: 'artistica', actNom: 'Taller de Pintura'},
    {nombre: 'Sonia Ruiz', email: 'sonia.r@ug.uchile.cl', tipo: 'estudiante_post', actividad: 'deportiva', actNom: 'Running Club'},
    {nombre: 'Laura Moreno', email: 'laura.m0@ug.uchile.cl', tipo: 'estudiante_post', actividad: 'recreativa', actNom: 'Club de Lectura'},
    {nombre: 'Beatriz Pérez', email: 'beatriz.p1@ug.uchile.cl', tipo: 'estudiante_post', actividad: 'tecnologica', actNom: 'Desarrollo Web'},
    {nombre: 'Pedro Gonzalez', email: 'pedro.g2@ug.uchile.cl', tipo: 'academico', actividad: 'artistica', actNom: 'Teatro Universitario'},
    {nombre: 'Rosa Gonzalez', email: 'rosa.g3@ug.uchile.cl', tipo: 'estudiante_pre', actividad: 'deportiva', actNom: 'Fútbol Sala'},
    {nombre: 'Pedro Perez', email: 'pedro.p4@ug.uchile.cl', tipo: 'estudiante_post', actividad: 'deportiva', actNom: 'Natación'},
    {nombre: 'Clara Hernández', email: 'clara.h5@ug.uchile.cl', tipo: 'estudiante_pre', actividad: 'recreativa', actNom: 'Senderismo'},
    {nombre: 'Rosa Diaz', email: 'rosa.d6@ug.uchile.cl', tipo: 'estudiante_pre', actividad: 'tecnologica', actNom: 'Robótica Educativa'},
    {nombre: 'Beatriz Pérez', email: 'beatriz.p7@ug.uchile.cl', tipo: 'estudiante_pre', actividad: 'recreativa', actNom: 'Cine Club'},
    {nombre: 'Fernando Sánchez', email: 'fernando.s8@ug.uchile.cl', tipo: 'estudiante_pre', actividad: 'tecnologica', actNom: 'Ciberseguridad'},
    {nombre: 'Beatriz Muñoz', email: 'beatriz.m9@ug.uchile.cl', tipo: 'estudiante_pre', actividad: 'social', actNom: 'Voluntariado Ambiental'},
    {nombre: 'Diego Muñoz', email: 'diego.m10@ug.uchile.cl', tipo: 'estudiante_pre', actividad: 'recreativa', actNom: 'E-Sports'},
    {nombre: 'Elena Alvarez', email: 'elena.a11@ug.uchile.cl', tipo: 'funcionario', actividad: 'deportiva', actNom: 'Tenis de Mesa'},
    {nombre: 'Diego Martín', email: 'diego.m12@ug.uchile.cl', tipo: 'funcionario', actividad: 'artistica', actNom: 'Fotografía Urbana'},
    {nombre: 'Maria Martín', email: 'maria.m13@ug.uchile.cl', tipo: 'funcionario', actividad: 'tecnologica', actNom: 'Administración de Redes'},
    {nombre: 'Carlos Romero', email: 'carlos.r14@ug.uchile.cl', tipo: 'academico', actividad: 'deportiva', actNom: 'Squash'},
    {nombre: 'Carmen Muñoz', email: 'carmen.m15@ug.uchile.cl', tipo: 'estudiante_post', actividad: 'artistica', actNom: 'Danza Contemporánea'},
    {nombre: 'Miguel Muñoz', email: 'miguel.m16@ug.uchile.cl', tipo: 'academico', actividad: 'recreativa', actNom: 'Gastronomía Club'},
    {nombre: 'Ricardo Ruiz', email: 'ricardo.r17@ug.uchile.cl', tipo: 'funcionario', actividad: 'tecnologica', actNom: 'Base de Datos'},
    {nombre: 'Carlos Rodriguez', email: 'carlos.r18@ug.uchile.cl', tipo: 'academico', actividad: 'tecnologica', actNom: 'Inteligencia Artificial'},
    {nombre: 'Javier Diaz', email: 'javier.d19@ug.uchile.cl', tipo: 'funcionario', actividad: 'tecnologica', actNom: 'Mantenimiento PC'},
    {nombre: 'Ana Diaz', email: 'ana.d20@ug.uchile.cl', tipo: 'estudiante_pre', actividad: 'recreativa', actNom: 'Avistamiento de Aves'},
    {nombre: 'Javier Diaz', email: 'javier.d21@ug.uchile.cl', tipo: 'funcionario', actividad: 'recreativa', actNom: 'Jardinería'},
    {nombre: 'Fernando Gonzalez', email: 'fernando.g22@ug.uchile.cl', tipo: 'estudiante_pre', actividad: 'tecnologica', actNom: 'Blockchain Workshop'},
    {nombre: 'Clara Gonzalez', email: 'clara.g23@ug.uchile.cl', tipo: 'estudiante_pre', actividad: 'recreativa', actNom: 'Paseos por la Ciudad'},
    {nombre: 'Luis Gómez', email: 'luis.g24@ug.uchile.cl', tipo: 'estudiante_post', actividad: 'artistica', actNom: 'Escultura en Greda'},
    {nombre: 'Luis Jiménez', email: 'luis.j25@ug.uchile.cl', tipo: 'academico', actividad: 'tecnologica', actNom: 'Data Science Hub'},
    {nombre: 'Clara Muñoz', email: 'clara.m26@ug.uchile.cl', tipo: 'estudiante_post', actividad: 'social', actNom: 'Asesoría Jurídica Social'},
    {nombre: 'Diego Lopez', email: 'diego.l27@ug.uchile.cl', tipo: 'estudiante_pre', actividad: 'social', actNom: 'Apoyo Escolar'},
    {nombre: 'Diego Ruiz', email: 'diego.r28@ug.uchile.cl', tipo: 'academico', actividad: 'social', actNom: 'Comité de Ética'},
    {nombre: 'Fernando Ruiz', email: 'fernando.r29@ug.uchile.cl', tipo: 'academico', actividad: 'social', actNom: 'Red de Egresados'},
    {nombre: 'Laura Sánchez', email: 'laura.s30@ug.uchile.cl', tipo: 'estudiante_post', actividad: 'tecnologica', actNom: 'App Móviles'},
    {nombre: 'Sonia Ruiz', email: 'sonia.r31@ug.uchile.cl', tipo: 'estudiante_pre', actividad: 'recreativa', actNom: 'Origami'},
    {nombre: 'Maria Sánchez', email: 'maria.s32@ug.uchile.cl', tipo: 'estudiante_pre', actividad: 'social', actNom: 'Banco de Alimentos'},
    {nombre: 'Laura Jiménez', email: 'laura.j33@ug.uchile.cl', tipo: 'estudiante_pre', actividad: 'recreativa', actNom: 'Tejido Creativo'},
    {nombre: 'Ricardo Perez', email: 'ricardo.p34@ug.uchile.cl', tipo: 'estudiante_pre', actividad: 'tecnologica', actNom: 'Arduino Club'},
    {nombre: 'Jose Gonzalez', email: 'jose.g35@ug.uchile.cl', tipo: 'academico', actividad: 'tecnologica', actNom: 'Sistemas Embebidos'},
    {nombre: 'Javier Martinez', email: 'javier.m36@ug.uchile.cl', tipo: 'academico', actividad: 'deportiva', actNom: 'Club de Golf'},
    {nombre: 'Laura Rodriguez', email: 'laura.r37@ug.uchile.cl', tipo: 'estudiante_post', actividad: 'artistica', actNom: 'Cerámica'},
    {nombre: 'Juan Alonso', email: 'juan.a38@ug.uchile.cl', tipo: 'estudiante_pre', actividad: 'social', actNom: 'Protección Animal'},
    {nombre: 'Miguel Gonzalez', email: 'miguel.g39@ug.uchile.cl', tipo: 'estudiante_pre', actividad: 'recreativa', actNom: 'Radio Universitaria'},
    {nombre: 'Laura Romero', email: 'laura.r40@ug.uchile.cl', tipo: 'estudiante_pre', actividad: 'social', actNom: 'Reciclaje Campus'},
    {nombre: 'Diego Gonzalez', email: 'diego.g41@ug.uchile.cl', tipo: 'estudiante_post', actividad: 'artistica', actNom: 'Grabado Metal'},
    {nombre: 'Ana Romero', email: 'ana.r42@ug.uchile.cl', tipo: 'estudiante_pre', actividad: 'artistica', actNom: 'Diseño Gráfico'},
    {nombre: 'Miguel Sánchez', email: 'miguel.s43@ug.uchile.cl', tipo: 'academico', actividad: 'deportiva', actNom: 'Maratón DCC'},
    {nombre: 'Ricardo Sánchez', email: 'ricardo.s44@ug.uchile.cl', tipo: 'funcionario', actividad: 'recreativa', actNom: 'Taller de Guitarra'},
    {nombre: 'Maria Muñoz', email: 'maria.m45@ug.uchile.cl', tipo: 'academico', actividad: 'artistica', actNom: 'Poesía DCC'},
    {nombre: 'Pedro Gonzalez', email: 'pedro.g46@ug.uchile.cl', tipo: 'estudiante_pre', actividad: 'social', actNom: 'Alfabetización Digital'},
    {nombre: 'Maria Rodriguez', email: 'maria.r47@ug.uchile.cl', tipo: 'academico', actividad: 'artistica', actNom: 'Banda de Jazz'},
    {nombre: 'Isabel Romero', email: 'isabel.r48@ug.uchile.cl', tipo: 'estudiante_post', actividad: 'deportiva', actNom: 'Escalada Libre'},
    {nombre: 'Nicolas Alvarado', email: 'nicolas.a48@ug.uchile.cl', tipo: 'estudiante_pre', actividad: 'social', actNom: 'Debate Universitario'}
];

let paginaActual = 1;
const filasPorPagina = 5;

const obtenerNombreTipoVisual = (tipoOriginal) => {
    const nombres = {
        "estudiante_pre": "Estudiante de Pregrado",
        "estudiante_post": "Estudiante de Postgrado",
        "funcionario": "Funcionario(a)",
        "academico": "Académico(a)"
    };
    return nombres[tipoOriginal] || tipoOriginal;
};

const validarNombre = (nombre) => nombre && nombre.trim().length >= 3;
const validarEmail = (email) => email && email.includes("@") && email.includes(".");
const validarUrl = (url) => url && url.startsWith("http");
const validarTelefono = (telefono) => {
    const regexTelefono = /^\+?\d{8}$/;
    return regexTelefono.test(telefono.replace(/\s/g, ''));
};

const actualizarcasillas = () => {
    let tipo = document.getElementById("tipo").value;
    let contenedor = document.getElementById("contenedor-dinamico");
    if (!contenedor) return;
    contenedor.innerHTML = "";
    if (tipo === "academico" || tipo === "funcionario") {
        let textoEtiqueta = (tipo === "academico") ? "Oficina (Opcional)" : "Área de trabajo (Opcional)";
        const fs = document.createElement("fieldset");
        fs.innerHTML = `<legend>Información Adicional</legend><div class="grupo-input"><label>${textoEtiqueta}</label><input id="extra-opcional" type="text" placeholder="Puedes dejarlo en blanco"></div>`;
        contenedor.appendChild(fs);
    }
};

const validarMiembro = () => {
    let nombre = document.getElementById("nombre");
    let email = document.getElementById("email");
    let telefono = document.getElementById("telefono");
    let tipo = document.getElementById("tipo");
    let mensajeError = "";

    if (!validarNombre(nombre.value)) {
        mensajeError += "- El nombre debe tener al menos 3 caracteres.\n";
        nombre.style.borderColor = "red";
    } else { 
        nombre.style.borderColor = ""; }

    if (!validarEmail(email.value)) {
        mensajeError += "- Email inválido (debe contener @ y .).\n";
        email.style.borderColor = "red";
    } else { 
        email.style.borderColor = ""; }

    if (!validarTelefono(telefono.value)) {
        mensajeError += "- El teléfono debe tener exactamente 8 números.\n";
        telefono.style.borderColor = "red";
    } else { 
        telefono.style.borderColor = ""; }

    if (tipo.value === "") {
        mensajeError += "- Debe seleccionar un tipo de miembro.\n";
        tipo.style.borderColor = "red";
    } else { 
        tipo.style.borderColor = ""; }

    if (mensajeError === "") {
        localStorage.setItem("usuarioSesion", nombre.value);
        document.getElementById("form-miembro").style.display = "none";
        document.getElementById("form-actividad").style.display = "block";
        window.scrollTo(0, 0);
    } else {
        alert("Atención:\n" + mensajeError);
    }
};

const validarActividad = () => {
    let tipoAct = document.getElementById("tipo-act");
    let nombreEsp = document.getElementById("nombre-especifico");
    let horarios = document.getElementById("horarios");
    let archivos = document.getElementById("archivos");
    let enlace = document.getElementById("enlace");
    let mensajeError = "";

    if (tipoAct.value === "") {
        mensajeError += "- Seleccione tipo de actividad.\n";
        tipoAct.style.borderColor = "red";
    } else { 
        tipoAct.style.borderColor = ""; }

    if (!validarNombre(nombreEsp.value)) { 
        mensajeError += "- Nombre de actividad inválido.\n";
        nombreEsp.style.borderColor = "red";
    } else {
        nombreEsp.style.borderColor = ""; }

    if (!validarNombre(horarios.value)) { 
        mensajeError += "- El horario es obligatorio (mínimo 3 caracteres).\n";
        horarios.style.borderColor = "red";
    } else { 
        horarios.style.borderColor = ""; }

    if (archivos.files.length === 0) {
        mensajeError += "- Debe subir un archivo.\n";
        archivos.style.borderColor = "red";
    } else { 
        archivos.style.borderColor = ""; }

    if (!validarUrl(enlace.value)) { 
        mensajeError += "- Enlace inválido (debe empezar con http).\n";
        enlace.style.borderColor = "red";
    } else { 
        enlace.style.borderColor = ""; }

    if (mensajeError === "") {
        alert("¡Registro completado!");
        window.location.href = "index.html";
    } else {
        alert("Atención:\n" + mensajeError);
    }
};

const actualizarTodo = () => {
    const busqueda = document.getElementById("busqueda")?.value.toLowerCase() || "";
    const filtroTipo = document.getElementById("filtro-tipo")?.value || "";
    const filtroActividad = document.getElementById("filtro-actividad")?.value || "";

    let filtrados = listaMiembros.filter(miembro => {
        const coincideNombre = miembro.nombre.toLowerCase().includes(busqueda);
        const coincideTipo = !filtroTipo || miembro.tipo === filtroTipo;
        const coincideActividad = !filtroActividad || miembro.actividad === filtroActividad;
        
        return coincideNombre && coincideTipo && coincideActividad;
    });
    
    const inicio = (paginaActual - 1) * filasPorPagina;
    const paginados = filtrados.slice(inicio, inicio + filasPorPagina);

    const tbody = document.querySelector("#tabla-miembros tbody");
    if (tbody) {
        tbody.innerHTML = paginados.map(miembro => `
            <tr>
                <td>${miembro.nombre}</td>
                <td>${obtenerNombreTipoVisual(miembro.tipo)}</td>
                <td style="text-transform:capitalize;">${miembro.actividad}</td>
                <td>${miembro.actNom}</td> 
            </tr>`).join('');
        
        const info = document.getElementById("info-pag");
        if(info) {
            const totalPaginas = Math.ceil(filtrados.length / filasPorPagina) || 1;
            info.innerText = `Página ${paginaActual} de ${totalPaginas}`;
        }
    }
};

const cambiarPagina = (dir) => {
    paginaActual += dir;
    if (paginaActual < 1) paginaActual = 1;
    actualizarTodo();
};

const renderizarGraficos = () => {
    const totalRegistros = listaMiembros.length;
    const contMiem = document.getElementById("grafico-miembros");
    const contAct = document.getElementById("grafico-actividades");

    if (contMiem) {
        const tipos = ["estudiante_pre", "estudiante_post", "funcionario", "academico"];
        contMiem.innerHTML = tipos.map(tipo => {
            const perc = ((listaMiembros.filter(miembro => miembro.tipo === tipo).length / totalRegistros) * 100).toFixed(1);
            return `<div class="bar-label">${obtenerNombreTipoVisual(tipo)} (${perc}%)</div><div class="bar-bg"><div class="bar-fill" style="width:${perc}%; background:#003366"></div></div>`;
        }).join('');
    }

    if (contAct) {
        const actividades = ["artistica", "deportiva", "tecnologica", "social", "recreativa"];
        contAct.innerHTML = actividades.map(actividades => {
            const perc = ((listaMiembros.filter(miembros => miembros.actividad === actividades).length / totalRegistros) * 100).toFixed(1);
            return `<div class="bar-label" style="text-transform:capitalize;">${actividades} (${perc}%)</div><div class="bar-bg"><div class="bar-fill" style="width:${perc}%; background:#0055aa"></div></div>`;
        }).join('');
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const tel = document.getElementById("telefono");
    if(tel) { tel.addEventListener("input", function() { this.value = this.value.replace(/[^0-9]/g, ''); }); }

    if (document.getElementById("tabla-miembros")) { actualizarTodo(); }

    if (document.getElementById("grafico-miembros") || document.getElementById("grafico-actividades")) { renderizarGraficos(); }
});