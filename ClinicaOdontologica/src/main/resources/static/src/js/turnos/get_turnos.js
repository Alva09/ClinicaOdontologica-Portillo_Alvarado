window.addEventListener("load", function () {
    (function () {
        // Con fetch invocamos a la API de turnos con el método GET
        // Nos devolverá un JSON con una colección de turnos
        const url = "/turnos/listar-todos";
        const settings = {
            method: "GET",
        };

        fetch(url, settings)
            .then((response) => response.json())
            .then((data) => {
                // Recorremos la colección de turnos del JSON
                for (let turno of data) {
                    // Por cada odontólogo armaremos una fila de la tabla
                    // Cada fila tendrá un id que luego nos permitirá borrar la fila si eliminamos el odontólogo
                    var tableBody = document.getElementById("turnoTableBody");
                    var turnoRow = tableBody.insertRow();
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
                }
            });
    })();
});
