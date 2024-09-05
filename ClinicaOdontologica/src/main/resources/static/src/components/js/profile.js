document.addEventListener("DOMContentLoaded", function() {
  fetch("/api/userinfo")
    .then(function(respuesta) {
      return respuesta.json();
    })
    .then(function(informacion) {
      const userInitial = document.getElementById('user-initial');
      const userName = document.getElementById('user-name');
      const userEmail = document.getElementById('user-email');
      userInitial.innerText = informacion.nombre[0].toUpperCase();
      userName.innerText = informacion.nombre;
      userEmail.innerText = informacion.email;
    })
    .catch(function(error) {
      console.error('Error fetching user info:', error);
    });
});

const logout = () => {
  Swal.fire({
    title: "¿Confirmar?",
    text: "Vas a cerrar sesión",
    icon: 'warning',
    showCancelButton: true,
    background: 'var(--color-card-background)',
    color: 'var(--color-text-secondary)',
  }).then((result) => {
    if(result.isConfirmed){
      const logoutUrl = '/logout';
      window.location.href = logoutUrl;
    }
  });
};
 