const btnSwitch = document.querySelector('#switch');
const table = document.querySelector('#table');

btnSwitch.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  btnSwitch.classList.toggle('active');
  table.classList.toggle('table-dark'); // Añadir o quitar la clase table-dark a la tabla

  /* LOCAL STORAGE SAVE MODE */
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('dark-mode', 'true');
  } else {
    localStorage.setItem('dark-mode', 'false');
  }
});

/* OBTENER EL MODO DEL BOTON AL RECARGAR LA PÁGINA */
if (localStorage.getItem('dark-mode') === 'true') {
  document.body.classList.add('dark');
  btnSwitch.classList.add('active');
  table.classList.add('table-dark'); // Asegurarse de que la tabla también esté en modo oscuro
} else {
  document.body.classList.remove('dark');
  btnSwitch.classList.remove('active');
  table.classList.remove('table-dark'); // Asegurarse de que la tabla no esté en modo oscuro
}
