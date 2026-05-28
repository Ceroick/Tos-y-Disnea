function dispararTos(tipoEstimulo) {
    console.log("Iniciando secuencia para: " + tipoEstimulo);
    
    // 1. Mostrar efecto visual del estímulo (ej. humo entrando)
    // 2. Ejecutar la función del Bloque Motor (los 6 pasos)
    animarFaseAferente(tipoEstimulo);
    setTimeout(animarBloqueMotor, 1000); 
}
