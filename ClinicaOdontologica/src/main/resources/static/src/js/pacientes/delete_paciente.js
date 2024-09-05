function deleteBy(id) {
    Swal.fire({
        title: "¿Confirmar?",
        text: "Esta acción no se puede revertir",
        icon: 'warning',
        showCancelButton: true,
        background: 'var(--color-card-background)',
        color: 'var(--color-text-secondary)',
    }).then((result) => {
        if (result.isConfirmed) {
            const url = '/pacientes/eliminar/' + id;
            const settings = {
                method: 'DELETE'
            };

            fetch(url, settings)
                .then(response => {
                    if (response.ok) {
                        // Eliminación exitosa
                        return Promise.resolve("Eliminado correctamente");
                    } else {
                        return response.json().then(body => {
                            throw new Error(body.message);
                        });
                    }
                })
                .then(data => {
                    // Eliminar la fila del DOM
                    let rowId = '#tr_' + id;
                    document.querySelector(rowId).remove();

                    // Mostrar una alerta de eliminación exitosa
                    Swal.fire({
                        title: "¡Eliminado!",
                        text: `Se eliminó correctamente el registro con id: ${id}`,
                        icon: "success",
                        background: 'var(--color-card-background)',
                        color: 'var(--color-text-secondary)',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                    });
                })
                .catch(error => {
                    console.error('Error al eliminar:', error);
                    // Mostrar una alerta de error si la eliminación falla
                    Swal.fire({
                        title: "Error",
                        text: error.message,
                        icon: "error",
                        background: 'var(--color-card-background)',
                        color: 'var(--color-text-secondary)',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                });
        }
    });
}
