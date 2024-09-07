window.addEventListener("load", function () {
    (function () {
        // Con fetch invocamos a la API de odontólogos con el método GET
        // Nos devolverá un JSON con una colección de odontólogos
        const url = "/pacientes/listar-todos";
        const settings = {
            method: "GET",
        };

        fetch(url, settings)
            .then((response) => response.json())
            .then((data) => {
                // Recorremos la colección de odontólogos del JSON
                for (let paciente of data) {
                    // Por cada odontólogo armaremos una fila de la tabla
                    // Cada fila tendrá un id que luego nos permitirá borrar la fila si eliminamos el odontólogo
                    var tableBody = document.getElementById("pacienteTableBody");
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
                        paciente.cedula +
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
                }
            });
    })();
});
