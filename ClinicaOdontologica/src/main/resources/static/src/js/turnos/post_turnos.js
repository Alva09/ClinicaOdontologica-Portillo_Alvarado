window.addEventListener('load', function () {

    // Al cargar la página buscamos y obtenemos el formulario donde estarán
    // los datos que el usuario cargará del nuevo turno
    const formulario = document.querySelector('#add_new_turno');

    // Ante un submit del formulario se ejecutará la siguiente función
    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        //Cerrar modal
        const modal = document.getElementById('add-turno');
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();

        // Creamos un JSON que tendrá los datos del nuevo turno
        const formData = {
            paciente: {
                id: document.querySelector('#nombrePaciente-add').value
            },
            odontologo: {
                id: document.querySelector('#nombreOdontologo-add').value
            },
            fecha: document.querySelector('#fechaTurno-add').value,
        };
        // Invocamos utilizando la función fetch la API de turnos con el método POST que guardará al turno que enviaremos en formato JSON
        const url = '/turnos';
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }

        fetch(url, settings)
            .then(response => {
                if (response.ok) {
                    // Eliminación exitosa
                    return Promise.resolve("Eliminado correctamente");
                } else {
                    /* Si hay un error lo que hacemos es manejar la respuesta del back
                    Usando: response.json().then(body => { throw new Error(body.message); });
                    Esto asegura que se capture el mensaje de error enviado por el servidor en caso de un problema */
                    return response.json().then(body => {
                        throw new Error(body.message);
                    });
                }
            })
            .then(data => {
                // Mensaje de éxito con SweetAlert2
                Swal.fire({
                    icon: 'success',
                    title: '¡Agregado!',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    background: 'var(--color-card-background)',
                    color: 'var(--color-text-secondary)',
                });
                updateTableTurno()
                formulario.reset();
            })
            .catch(error => {
                // Mensaje de error con SweetAlert2
                Swal.fire({
                    icon: 'error',
                    title: 'Error al agregar el turno',
                    text: error.message,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    background: 'var(--color-card-background)',
                    color: 'var(--color-text-secondary)',
                });
                console.error('Error:', error);
            });
    });

});

function updateTableTurno() {
    const url = "/turnos/listar-todos";
    const settings = {
        method: "GET",
    };

    fetch(url, settings)
        .then((response) => response.json())
        .then((data) => {
            const tableBody = document.getElementById("turnoTableBody");
            tableBody.innerHTML = ""; // Limpiar contenido actual de la tabla

            data.forEach((turno) => {
                let turnoRow = tableBody.insertRow();
                let tr_id = "tr_" + turno.id;
                    turnoRow.id = tr_id;

                    // Botón de editar
                    let editButton =
                        "<button" +
                        " id=" +
                        '"' +
                        "btn_edit_" +
                        turno.id +
                        '"' +
                        ' type="button" onclick="findBy(' +
                        turno.id +
                        ')" class="btn_edit">' +
                        '<i class="fa-solid fa-pen-to-square"></i>' +
                        "</button>";

                    // Botón de eliminar
                    let deleteButton =
                        "<button" +
                        " id=" +
                        '"' +
                        "btn_delete_" +
                        turno.id +
                        '"' +
                        ' type="button" onclick="deleteBy(' +
                        turno.id +
                        ')" class="btn_delete">' +
                        '<i class="fa-solid fa-trash"></i>' +
                        "</button>";

                    // Armamos cada columna de la fila
                    // Primero los datos del odontólogo
                    // Luego los botones de editar y eliminar
                    
                    const odontologo = `${turno.odontologo.nombre} ${turno.odontologo.apellido}`;
                    const paciente = `${turno.paciente.nombre} ${turno.paciente.apellido}`;

                    turnoRow.innerHTML =
                        "<td>" +
                        turno.id +
                        "</td>" +
                        '<td class="td_odontologo">' +
                        odontologo.toUpperCase() +
                        "</td>" +
                        '<td class="td_paciente">' +
                        paciente.toUpperCase() +
                        "</td>" +
                        '<td class="td_fechaTurno">' +
                        turno.fecha +
                        "</td>" +
                        '<td class="actions-buttons">' +
                        editButton +
                        deleteButton +
                        "</td>";
            });
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}
