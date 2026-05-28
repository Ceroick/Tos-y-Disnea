// Manejo de la navegación entre módulos
function mostrarModulo(modulo) {
    // Referencias a los contenedores principales
    const pantallaInicio = document.getElementById('pantalla-inicio');
    const moduloTrabajo = document.getElementById('modulo-trabajo');
    const tituloModulo = document.getElementById('titulo-modulo');
    
    // Referencias a los algoritmos y visor
    const algoritmoTos = document.getElementById('algoritmo-tos');
    const algoritmoDisnea = document.getElementById('algoritmo-disnea');
    const renderVisual = document.getElementById('render-visual');

    // 1. Transición de vistas
    pantallaInicio.style.display = 'none';
    moduloTrabajo.style.display = 'flex';

    // 2. Resetear el estado visual de los algoritmos
    algoritmoTos.style.display = 'none';
    algoritmoDisnea.style.display = 'none';

    // 3. Inyectar datos según la patología seleccionada
    if (modulo === 'tos') {
        tituloModulo.innerText = 'Simulación: Evaluación Clínica de la Tos';
        algoritmoTos.style.display = 'flex';
        
        // Verifica que el archivo en la carpeta assets se llame exactamente así
        renderVisual.src = 'assets/animacion_tos.gif'; 
    } 
    else if (modulo === 'disnea') {
        tituloModulo.innerText = 'Simulación: Evaluación Clínica de la Disnea';
        algoritmoDisnea.style.display = 'flex';
        
        // Verifica que el archivo en la carpeta assets se llame exactamente así
        renderVisual.src = 'assets/animacion_disnea.gif'; 
    }
}

function regresar() {
    const pantallaInicio = document.getElementById('pantalla-inicio');
    const moduloTrabajo = document.getElementById('modulo-trabajo');
    const renderVisual = document.getElementById('render-visual');

    // Purgar la fuente de la imagen para liberar memoria y detener el GIF en segundo plano
    renderVisual.src = ''; 

    // Restaurar la vista del menú principal
    pantallaInicio.style.display = 'flex';
    moduloTrabajo.style.display = 'none';
}
