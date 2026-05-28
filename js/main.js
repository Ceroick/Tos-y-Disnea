function mostrarModulo(modulo) {
    document.getElementById('pantalla-inicio').style.display = 'none';
    if (modulo === 'tos') {
        document.getElementById('modulo-tos').style.display = 'flex';
    }
}

function regresar() {
    document.getElementById('pantalla-inicio').style.display = 'flex';
    document.getElementById('modulo-tos').style.display = 'none';
    // Aquí puedes añadir lógica para resetear animaciones
}
