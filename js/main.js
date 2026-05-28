// Variable global para controlar el motor numérico del monitor
let simuladorInterval;

// 1. Manejo de la navegación y carga de módulos
function mostrarModulo(modulo) {
    const pantallaInicio = document.getElementById('pantalla-inicio');
    const moduloTrabajo = document.getElementById('modulo-trabajo');
    const tituloModulo = document.getElementById('titulo-modulo');
    
    // Referencias a los contenedores
    const renderVisual = document.getElementById('render-visual');
    const datosTos = document.getElementById('datos-tos');
    const datosDisnea = document.getElementById('datos-disnea');
    const btnEstimulo = document.getElementById('btn-estimulo');

    // Limpiar procesos activos previos
    clearInterval(simuladorInterval);
    resetearValoresBasales();

    // Transición de vistas
    pantallaInicio.style.display = 'none';
    moduloTrabajo.style.display = 'flex';

    // Resetear visibilidad de los paneles de constantes
    datosTos.style.display = 'none';
    datosDisnea.style.display = 'none';

    // Inyectar contexto según la selección
    if (modulo === 'tos') {
        tituloModulo.innerText = 'Simulación: Dinámica del Arco Tusígeno';
        datosTos.style.display = 'grid';
        renderVisual.src = 'assets/animacion_tos.mp4'; 
        
        btnEstimulo.innerText = 'Generar Estímulo Tusígeno';
        btnEstimulo.onclick = () => iniciarArcoTusigeno(renderVisual);
    } 
    else if (modulo === 'disnea') {
        tituloModulo.innerText = 'Simulación: Mecánica de la Disnea';
        datosDisnea.style.display = 'grid';
        renderVisual.src = 'assets/animacion_disnea.mp4';
        
        btnEstimulo.innerText = 'Aumentar Carga Ventilatoria';
        btnEstimulo.onclick = () => iniciarCrisisDisneica(renderVisual);
    }

    renderVisual.load();
    renderVisual.pause();
    renderVisual.currentTime = 0;
}

// 2. Función para regresar al menú
function regresar() {
    // Recarga la página para limpiar memoria de video y estados
    window.location.reload(); 
}

// 3. Motor Fisiológico Sincronizado para video de 4 segundos
function iniciarArcoTusigeno(video) {
    video.currentTime = 0;
    video.play();

    const valPleural = document.getElementById('val-pleural');
    const valAlveolar = document.getElementById('val-alveolar');
    const valFlujo = document.getElementById('val-flujo');

    clearInterval(simuladorInterval);
    
    simuladorInterval = setInterval(() => {
        let t = video.currentTime;
        
        if (t < 0.65) { 
            // Fase Aferente: Basal
            valPleural.innerHTML = '-5 <small>cmH2O</small>';
            valAlveolar.innerHTML = '0 <small>cmH2O</small>';
            valFlujo.innerHTML = '0.0 <small>L/s</small>';
        } 
        else if (t >= 0.65 && t < 2.65) { 
            // Fase Inspiratoria
            valPleural.innerHTML = '-15 <small>cmH2O</small>';
            valAlveolar.innerHTML = '-3 <small>cmH2O</small>';
            valFlujo.innerHTML = '1.8 <small>L/s</small>'; 
        } 
        else if (t >= 2.65 && t < 2.95) { 
            // Fase Compresiva (Isométrica)
            valPleural.innerHTML = '80 <small>cmH2O</small>';
            valAlveolar.innerHTML = '100 <small>cmH2O</small>';
            valFlujo.innerHTML = '0.0 <small>L/s</small>'; 
        } 
        else if (t >= 2.95 && t < 4.00) { 
            // Fase Expulsiva (Dinámica)
            valPleural.innerHTML = '50 <small>cmH2O</small>';
            valAlveolar.innerHTML = '40 <small>cmH2O</small>';
            valFlujo.innerHTML = '12.0 <small>L/s</small>'; 
        } 
        else { 
            resetearValoresBasales();
            clearInterval(simuladorInterval);
        }
    }, 50);
}

// 4. Motor Fisiológico: DISNEA (Esqueleto)
function iniciarCrisisDisneica(video) {
    video.currentTime = 0;
    video.play();
    console.log("Simulación de disnea iniciada.");
}

// 5. Utilidad de reseteo
function resetearValoresBasales() {
    const valPleural = document.getElementById('val-pleural');
    const valAlveolar = document.getElementById('val-alveolar');
    const valFlujo = document.getElementById('val-flujo');
    
    if(valPleural) valPleural.innerHTML = '-5 <small>cmH2O</small>';
    if(valAlveolar) valAlveolar.innerHTML = '0 <small>cmH2O</small>';
    if(valFlujo) valFlujo.innerHTML = '0.0 <small>L/s</small>';
}
