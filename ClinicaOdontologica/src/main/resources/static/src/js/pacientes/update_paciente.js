window.addEventListener("load", function () {
    const formulario = document.querySelector("#update_paciente_form");

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        //Cerrar modal
        const modal = document.getElementById("update-paciente");
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();

        //Obtener el paciente y crear JSON

        let pacienteId = document.querySelector("#paciente_id").value;
        const formData = {
            id: pacienteId,
            nombre: document.querySelector("#nombre").value,
            apellido: document.querySelector("#apellido").value,
            cedula: document.querySelector("#cedula").value,
            fechaIngreso: document.querySelector("#fechaIngreso").value,
            domicilio: {
                calle: document.querySelector("#calle").value,
                numero: document.querySelector("#numero_calle").value,
                localidad: document.querySelector("#localidad").value,
                provincia: document.querySelector("#provincia").value,
            },
            email: document.querySelector("#email").value,
        };

        const url = "/pacientes";
        const settings = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        };

        fetch(url, settings)
            .then((response) => {
                if (response.ok) {
                    return Promise.resolve("Eliminado correctamente");
                } else {
                    return response.json().then((body) => {
                        throw new Error(body.message);
                    });
                }
            })
            .then((data) => {
                // Mostrar alerta de éxito
                Swal.fire({
                    icon: "success",
                    title: "¡Actualizado!",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    background: "var(--color-card-background)",
                    color: "var(--color-text-secondary)",
                });
                updateTable();
            })
            .catch((error) => {
                console.error("Error:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error al actualizar el paciente",
                    text: error.message,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    background: "var(--color-card-background)",
                    color: "var(--color-text-secondary)",
                });
            });
    });
});

function findBy(id) {
    const url = "/pacientes/buscar-id/" + id;
    const settings = {
        method: "GET",
    };

    fetch(url, settings)
        .then((response) => response.json())
        .then((data) => {
            let paciente = data;
            document.querySelector("#paciente_id").value = paciente.id;
            document.querySelector("#nombre").value = paciente.nombre;
            document.querySelector("#apellido").value = paciente.apellido;
            document.querySelector("#cedula").value = paciente.cedula;
            document.querySelector("#fechaIngreso").value = paciente.fechaIngreso;
            document.querySelector('#email').value = paciente.email;
            document.querySelector('#calle').value = paciente.domicilio.calle;
            document.querySelector('#numero_calle').value = paciente.domicilio.numero;
            document.querySelector('#localidad').value = paciente.domicilio.localidad;
            document.querySelector('#provincia').value = paciente.domicilio.provincia;

            //Abrir modal
            const modal = new bootstrap.Modal(document.getElementById('update-paciente'))
            modal.show();

            
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function updateTable() {
    const url = "/pacientes/listar-todos";
    const settings = {
        method: "GET",
    };

    fetch(url, settings)
        .then((response) => response.json())
        .then((data) => {
            const tableBody = document.getElementById("pacienteTableBody");
            tableBody.innerHTML = ""; // Limpiar contenido actual de la tabla
            data.forEach((paciente) => {
                    var pacienteRow = tableBody.insertRow();
                    let tr_id = "tr_" + paciente.id;
                    pacienteRow.id = tr_id;

                    // Botón de editar
                    let editButton =
                        "<button" +
                        " id=" +
                        '"' +
                        "btn_edit_" +
                        paciente.id +
                        '"' +
                        ' type="button" onclick="findBy(' +
                        paciente.id +
                        ')" class="btn_edit">' +
                        '<i class="fa-solid fa-pen-to-square"></i>' +
                        "</button>";

                    // Botón de eliminar
                    let deleteButton =
                        "<button" +
                        " id=" +
                        '"' +
                        "btn_delete_" +
                        paciente.id +
                        '"' +
                        ' type="button" onclick="deleteBy(' +
                        paciente.id +
                        ')" class="btn_delete">' +
                        '<i class="fa-solid fa-trash"></i>' +
                        "</button>";

                    // Armamos cada columna de la fila
                    // Primero los datos del paciente
                    // Luego los botones de editar y eliminar
                    const domicilio = `${paciente.domicilio.calle} ${paciente.domicilio.numero} ${paciente.domicilio.localidad} ${paciente.domicilio.provincia}`
                    pacienteRow.innerHTML =
                        "<td>" +
                        paciente.id +
                        "</td>" +
                        '<td class="td_nombre">' +
                        paciente.nombre.toUpperCase() +
                        "</td>" +
                        '<td class="td_apellido">' +
                        paciente.apellido.toUpperCase() +
                        "</td>" +
                        '<td class="td_cedula">' +
                        paciente.cedula.toUpperCase() +
                        "</td>" +
                        '<td class="td_fechaIngreso">' +
                        paciente.fechaIngreso +
                        "</td>" +
                        '<td class="td_domicilio">' +
                        domicilio.toUpperCase() +
                        "</td>" +
                        '<td class="td_email">' +
                        paciente.email.toUpperCase() +
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
