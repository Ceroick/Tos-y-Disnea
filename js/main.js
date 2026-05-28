// Variables globales
let simuladorInterval;
let zoomScale = 1;
let isDragging = false;
let startX, startY, translateX = 0, translateY = 0;

// 1. Manejo de la navegación y carga de módulos
function mostrarModulo(modulo) {
    const pantallaInicio = document.getElementById('pantalla-inicio');
    const moduloTrabajo = document.getElementById('modulo-trabajo');
    const tituloModulo = document.getElementById('titulo-modulo');
    
    const renderVisual = document.getElementById('render-visual');
    const datosTos = document.getElementById('datos-tos');
    const datosDisnea = document.getElementById('datos-disnea');
    const btnEstimulo = document.getElementById('btn-estimulo');

    clearInterval(simuladorInterval);
    resetearValoresBasales();

    pantallaInicio.style.display = 'none';
    moduloTrabajo.style.display = 'flex';

    datosTos.style.display = 'none';
    datosDisnea.style.display = 'none';

    if (modulo === 'tos') {
        tituloModulo.innerText = 'Simulación: Dinámica del Arco Tusígeno';
        datosTos.style.display = 'grid';
        renderVisual.src = 'assets/animacion_tos.mp4'; 
        btnEstimulo.innerText = 'Generar Estímulo Tusígeno';
        btnEstimulo.onclick = () => iniciarArcoTusigeno(renderVisual);
        
        // Carga el algoritmo de tos y resetea el zoom
        const imgInspeccion = document.getElementById('img-inspeccion');
        if(imgInspeccion) {
            imgInspeccion.src = 'assets/algoritmo_tos.png';
            zoomScale = 1; translateX = 0; translateY = 0;
            imgInspeccion.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoomScale})`;
        }
    } 
    else if (modulo === 'disnea') {
        tituloModulo.innerText = 'Simulación: Mecánica de la Disnea';
        datosDisnea.style.display = 'grid';
        renderVisual.src = 'assets/animacion_disnea.mp4';
        btnEstimulo.innerText = 'Aumentar Carga Ventilatoria';
        btnEstimulo.onclick = () => iniciarCrisisDisneica(renderVisual);
        
        // Carga el algoritmo de disnea y resetea el zoom
        const imgInspeccion = document.getElementById('img-inspeccion');
        if(imgInspeccion) {
            imgInspeccion.src = 'assets/algoritmo_disnea.png';
            zoomScale = 1; translateX = 0; translateY = 0;
            imgInspeccion.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoomScale})`;
        }
    }

    renderVisual.load();
    renderVisual.pause();
    renderVisual.currentTime = 0;
}

// 2. Función para regresar al menú
function regresar() {
    window.location.reload(); 
}

// 3. Función de Interacción (La lupa microfisiológica)
function mostrarMicro(zona) {
    const video = document.getElementById('render-visual');
    const panelImg = document.getElementById('panel-inspeccion');
    
    video.pause();

    // Resetear motor de zoom antes de inyectar nueva imagen
    zoomScale = 1;
    translateX = 0;
    translateY = 0;
    
    const contenido = {
        'cerebro': 'assets/micro_cerebro.gif',
        'bronquios': 'assets/micro_bronquios.gif',
        'diafragma': 'assets/micro_diafragma.gif'
    };
    
    panelImg.innerHTML = `<img id="img-inspeccion" src="${contenido[zona]}" style="width: 100%; height: 100%; object-fit: contain; transition: transform 0.1s ease-out; transform-origin: center;">`;
    panelImg.style.border = '2px solid #38bdf8';
}

// 4. Motor Fisiológico Sincronizado
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
            valPleural.innerHTML = '-5 <small>cmH2O</small>';
            valAlveolar.innerHTML = '0 <small>cmH2O</small>';
            valFlujo.innerHTML = '0.0 <small>L/s</small>';
        } 
        else if (t >= 0.65 && t < 2.65) { 
            valPleural.innerHTML = '-15 <small>cmH2O</small>';
            valAlveolar.innerHTML = '-3 <small>cmH2O</small>';
            valFlujo.innerHTML = '1.8 <small>L/s</small>'; 
        } 
        else if (t >= 2.65 && t < 2.95) { 
            valPleural.innerHTML = '80 <small>cmH2O</small>';
            valAlveolar.innerHTML = '100 <small>cmH2O</small>';
            valFlujo.innerHTML = '0.0 <small>L/s</small>'; 
        } 
        else if (t >= 2.95 && t < 4.00) { 
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

function iniciarCrisisDisneica(video) {
    video.currentTime = 0;
    video.play();
}

function resetearValoresBasales() {
    const valPleural = document.getElementById('val-pleural');
    const valAlveolar = document.getElementById('val-alveolar');
    const valFlujo = document.getElementById('val-flujo');
    if(valPleural) valPleural.innerHTML = '-5 <small>cmH2O</small>';
    if(valAlveolar) valAlveolar.innerHTML = '0 <small>cmH2O</small>';
    if(valFlujo) valFlujo.innerHTML = '0.0 <small>L/s</small>';
}

// 5. Sistema de Zoom y Paneo
const panelInspeccion = document.getElementById('panel-inspeccion');

panelInspeccion.addEventListener('wheel', (e) => {
    e.preventDefault();
    const img = document.getElementById('img-inspeccion');
    if (!img) return;
    zoomScale += e.deltaY * -0.0015;
    zoomScale = Math.min(Math.max(1, zoomScale), 5);
    img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoomScale})`;
}, { passive: false });

panelInspeccion.addEventListener('mousedown', (e) => {
    if (!document.getElementById('img-inspeccion')) return;
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    panelInspeccion.style.cursor = 'grabbing';
});

panelInspeccion.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const img = document.getElementById('img-inspeccion');
    if (!img) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoomScale})`;
});

panelInspeccion.addEventListener('mouseup', () => { isDragging = false; panelInspeccion.style.cursor = 'grab'; });
panelInspeccion.addEventListener('mouseleave', () => { isDragging = false; panelInspeccion.style.cursor = 'grab'; });
