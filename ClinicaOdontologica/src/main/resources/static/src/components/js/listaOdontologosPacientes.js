// Función para construir opciones de odontólogos y pacientes en sus respectivos <select>
function construirSelectsOdontologos(odontologos) {
    // Construir opciones para odontólogos
    const selectOdontologos = document.getElementById('nombreOdontologo');
    selectOdontologos.innerHTML = ''; // Limpiar opciones existentes

    odontologos.forEach(odontologo => {
        const option = document.createElement('option');
        option.value = odontologo.id;
        option.textContent = `${odontologo.nombre} ${odontologo.apellido}`;
        selectOdontologos.appendChild(option);
    });

    const selectOdontologos1 = document.getElementById('nombreOdontologo-add');
    selectOdontologos1.innerHTML = ''; // Limpiar opciones existentes

    odontologos.forEach(odontologo => {
        const option = document.createElement('option');
        option.value = odontologo.id;
        option.textContent = `${odontologo.nombre} ${odontologo.apellido}`;
        selectOdontologos1.appendChild(option);
    });
}

function construirSelectsPacientes(pacientes) {
    // Construir opciones para pacientes
    const selectPacientes = document.getElementById('nombrePaciente');
    selectPacientes.innerHTML = ''; // Limpiar opciones existentes

    pacientes.forEach(paciente => {
        const option = document.createElement('option');
        option.value = paciente.id;
        option.textContent = `${paciente.nombre} ${paciente.apellido}`;
        selectPacientes.appendChild(option);
    });

    const selectPacientes1 = document.getElementById('nombrePaciente-add');
    selectPacientes1.innerHTML = ''; // Limpiar opciones existentes

    pacientes.forEach(paciente => {
        const option = document.createElement('option');
        option.value = paciente.id;
        option.textContent = `${paciente.nombre} ${paciente.apellido}`;
        selectPacientes1.appendChild(option);
    });
}

// Función para obtener odontólogos
function obtenerOdontologos() {
    const urlOdontologos = "/odontologos/listar-todos";
    const settingsOdontologos = {
        method: "GET",
    };

    fetch(urlOdontologos, settingsOdontologos)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(odontologos => {
            if (odontologos) {
                construirSelectsOdontologos(odontologos);
            } else {
                throw new Error('No se recibieron datos válidos de odontólogos.');
            }
        })
        .catch(error => {
            console.error('Error fetching odontólogos:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al obtener datos',
                text: 'Hubo un problema al obtener la lista de odontólogos.',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                background: 'var(--color-card-background)',
                color: 'var(--color-text-secondary)',
            });
        });
}

// Función para obtener pacientes
function obtenerPacientes() {
    const urlPacientes = "/pacientes/listar-todos";
    const settingsPacientes = {
        method: "GET",
    };

    fetch(urlPacientes, settingsPacientes)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(pacientes => {
            if (pacientes) {
                construirSelectsPacientes(pacientes);
            } else {
                throw new Error('No se recibieron datos válidos de pacientes.');
            }
        })
        .catch(error => {
            console.error('Error fetching pacientes:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al obtener datos',
                text: 'Hubo un problema al obtener la lista de pacientes.',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                background: 'var(--color-card-background)',
                color: 'var(--color-text-secondary)',
            });
        });
}

// Llamar a las funciones para obtener odontólogos y pacientes cuando se carga la página u otra acción necesaria
window.addEventListener('load', function () {
    obtenerOdontologos();
    obtenerPacientes();
});
