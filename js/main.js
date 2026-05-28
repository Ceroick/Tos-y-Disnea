// Manejo de la navegación entre módulos
function mostrarModulo(modulo) {
    const pantallaInicio = document.getElementById('pantalla-inicio');
    const moduloTrabajo = document.getElementById('modulo-trabajo');
    const tituloModulo = document.getElementById('titulo-modulo');

    // Ocultar inicio, mostrar área de trabajo
    pantallaInicio.style.display = 'none';
    moduloTrabajo.style.display = 'flex';

    // Ajustar el título según la selección
    if (modulo === 'tos') {
        tituloModulo.innerText = 'Simulación: Arco Reflejo de la Tos';
    } else if (modulo === 'disnea') {
        tituloModulo.innerText = 'Simulación: Fisiopatología de la Disnea';
    }
}

function regresar() {
    const pantallaInicio = document.getElementById('pantalla-inicio');
    const moduloTrabajo = document.getElementById('modulo-trabajo');

    // Volver al estado original
    pantallaInicio.style.display = 'flex';
    moduloTrabajo.style.display = 'none';
}
