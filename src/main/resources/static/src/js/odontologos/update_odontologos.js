window.addEventListener("load", function () {
  const formulario = document.querySelector("#update_odontologo_form");

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    let odontologoId = document.querySelector("#odontologo_id").value;
    const formData = {
      id: odontologoId,
      matricula: document.querySelector("#matricula").value,
      nombre: document.querySelector("#nombre").value,
      apellido: document.querySelector("#apellido").value,
    };

    const url = "/odontologos";
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
          return response.json().then(body => {
            throw new Error(body.message);
          });
        }
      })
      .then((data) => {
        // Mostrar alerta de éxito
        Swal.fire({
          position: "bottom-end",
          toast: true,
          icon: "success",
          title: "Actualizado con éxito",
          background: "var(--color-card-background)",
          color: "var(--color-text-secondary)",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
        updateTable();
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          position: "bottom-end",
          toast: true,
          icon: "error",
          title: "Error",
          text: error.message,
          background: "var(--color-card-background)",
          color: "var(--color-text-secondary)",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      });
  });
});
function hideForm() {
  // Animar la tabla para que vuelva a su posición original

  document.querySelector("#update-form").style.display = "none";
}
function animateBoxShadow() {
  gsap.fromTo(
    "#odontologo_updating",
    { boxShadow: "0 0 0px rgba(255, 255, 255, 0)" },
    {
      boxShadow: "0 0 10px rgba(0, 116, 160, 1)",
      duration: 0.5,
      yoyo: true,
      repeat: 1,
    }
  );
}

function findBy(id) {
  const url = "/odontologos/buscar-id/" + id;
  const settings = {
    method: "GET",
  };

  fetch(url, settings)
    .then((response) => response.json())
    .then((data) => {
      let odontologo = data;
      document.querySelector("#odontologo_id").value = odontologo.id;
      document.querySelector("#matricula").value = odontologo.matricula;
      document.querySelector("#nombre").value = odontologo.nombre;
      document.querySelector("#apellido").value = odontologo.apellido;

      const updatingForm = document.querySelector("#update-form");

      if (updatingForm.style.display === "block") {
        // Si el formulario ya está visible, animar el box-shadow
        animateBoxShadow();
      } else {
        // Si el formulario no está visible, mostrarlo:
        gsap.fromTo(
          updatingForm,
          { x: -100, display: "none" },
          { x: 0, display: "block", duration: 0.5 }
        );
        gsap.fromTo(
          ".odontologos-table-wrapper",
          { x: -50, display: "none" },
          { x: 0, display: "block", duration: 0.5 }
        );
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function updateTable() {
  const url = "/odontologos/listar-todos";
  const settings = {
    method: "GET",
  };

  fetch(url, settings)
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("odontologoTableBody");
      tableBody.innerHTML = ""; // Limpiar contenido actual de la tabla

      data.forEach((odontologo) => {
        let odontologoRow = tableBody.insertRow();
        let tr_id = "tr_" + odontologo.id;
        odontologoRow.id = tr_id;

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
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
