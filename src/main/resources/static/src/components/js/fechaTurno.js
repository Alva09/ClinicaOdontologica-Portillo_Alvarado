// Función para establecer la fecha mínima y máxima en los campos de fecha
function setMinDate() {
    // Obtener la fecha actual
    const fechaActual = new Date();

    // Calcular la fecha de mañana
    const fechaManana = new Date(fechaActual);
    fechaManana.setDate(fechaActual.getDate() + 1);
    const diaManana = String(fechaManana.getDate()).padStart(2, '0');
    const mesManana = String(fechaManana.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
    const anhioManana = fechaManana.getFullYear();
    const fechaMinima = `${anhioManana}-${mesManana}-${diaManana}`;

    // Asignar las fechas mínima y máxima a los inputs
    const inputFechaTurno = document.getElementById('fechaTurno-add');
    const inputFechaTurno1 = document.getElementById('fechaTurno');

    if (inputFechaTurno) {
        inputFechaTurno.setAttribute('min', fechaMinima);
    }

    if (inputFechaTurno1) {
        inputFechaTurno1.setAttribute('min', fechaMinima);
    }
}

// Ejecutar la función cuando el contenido del DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', setMinDate);