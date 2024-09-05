window.addEventListener("load", function () {
    (function () {
        // Con fetch invocamos a la API de odontólogos con el método GET
        // Nos devolverá un JSON con una colección de odontólogos
        const url = "/odontologos/listar-todos";
        const settings = {
            method: "GET",
        };

        fetch(url, settings)
            .then((response) => response.json())
            .then((data) => {
                // Recorremos la colección de odontólogos del JSON
                for (let odontologo of data) {
                    // Por cada odontólogo armaremos una fila de la tabla
                    // Cada fila tendrá un id que luego nos permitirá borrar la fila si eliminamos el odontólogo
                    var tableBody = document.getElementById("odontologoTableBody");
                    var odontologoRow = tableBody.insertRow();
                    let tr_id = "tr_" + odontologo.id;
                    odontologoRow.id = tr_id;

                    // Botón de editar
                    let editButton =
                        "<button" +
                        " id=" +
                        '"' +
                        "btn_edit_" +
                        odontologo.id +
                        '"' +
                        ' type="button" onclick="findBy(' +
                        odontologo.id +
                        ')" class="btn_edit">' +
                        '<i class="fa-solid fa-pen-to-square"></i>' +
                        "</button>";

                    // Botón de eliminar
                    let deleteButton =
                        "<button" +
                        " id=" +
                        '"' +
                        "btn_delete_" +
                        odontologo.id +
                        '"' +
                        ' type="button" onclick="deleteBy(' +
                        odontologo.id +
                        ')" class="btn_delete">' +
                        '<i class="fa-solid fa-trash"></i>' +
                        "</button>";

                    // Armamos cada columna de la fila
                    // Primero los datos del odontólogo
                    // Luego los botones de editar y eliminar
                    odontologoRow.innerHTML =
                        "<td>" +
                        odontologo.id +
                        "</td>" +
                        '<td class="td_matricula">' +
                        odontologo.matricula.toUpperCase() +
                        "</td>" +
                        '<td class="td_nombre">' +
                        odontologo.nombre.toUpperCase() +
                        "</td>" +
                        '<td class="td_apellido">' +
                        odontologo.apellido.toUpperCase() +
                        "</td>" +
                        '<td class="actions-buttons">' +
                        editButton +
                        deleteButton +
                        "</td>";
                }
            });
    })();
});
