function setMaxDate() {
    // Obtener la fecha actual en formato YYYY-MM-DD
    const fechaActual = new Date();
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
    const anhio = fechaActual.getFullYear();
    const fechaFormateada = `${anhio}-${mes}-${dia}`;

    // Asignar la fecha actual al atributo max de los inputs
    const inputFechaIngreso = document.getElementById('fechaIngreso-add');
    const inputFechaIngreso2 = document.getElementById('fechaIngreso');

    if (inputFechaIngreso) {
        inputFechaIngreso.setAttribute('max', fechaFormateada);
    }

    if (inputFechaIngreso2) {
        inputFechaIngreso2.setAttribute('max', fechaFormateada);
    }
}

// Ejecutar la función cuando el contenido del DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', setMaxDate);