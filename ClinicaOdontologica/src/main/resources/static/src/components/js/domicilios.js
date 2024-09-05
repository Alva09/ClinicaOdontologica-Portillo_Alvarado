// URL de las APIs
const API_PROVINCIAS = "https://apis.datos.gob.ar/georef/api/provincias?orden=nombre&aplanar=true&campos=nombre&max=30&inicio=0&exacto=true";
const API_LOCALIDADES = "https://apis.datos.gob.ar/georef/api/localidades?orden=nombre&aplanar=true&campos=nombre&max=4999&inicio=0&exacto=true";

// Función para obtener datos de la API
async function obtenerDatos(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Error en la petición');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return null;
    }
}

// Función para poblar el select de provincias
async function poblarProvincias() {
    const data = await obtenerDatos(API_PROVINCIAS);
    if (data && data.provincias) {
        const provinciaSelect = document.getElementById('provincia-add');
        data.provincias.forEach(provincia => {
            const option = document.createElement('option');
            option.value = provincia.nombre;
            option.textContent = provincia.nombre;
            provinciaSelect.appendChild(option);
        });
    }
}

// Función para poblar el select de localidades
async function poblarLocalidades() {
    const data = await obtenerDatos(API_LOCALIDADES);
    if (data && data.localidades) {
        const localidadSelect = document.getElementById('localidad-add');
        data.localidades.forEach(localidad => {
            const option = document.createElement('option');
            option.value = localidad.nombre;
            option.textContent = localidad.nombre;
            localidadSelect.appendChild(option);
        });
    }
}

// Función para poblar el select de provincias
async function poblarProvincias1() {
    const data = await obtenerDatos(API_PROVINCIAS);
    if (data && data.provincias) {
        const provinciaSelect1 = document.getElementById('provincia');
        data.provincias.forEach(provincia => {
            const option = document.createElement('option');
            option.value = provincia.nombre;
            option.textContent = provincia.nombre;
            provinciaSelect1.appendChild(option);
        });
    }
}

// Función para poblar el select de localidades
async function poblarLocalidades1() {
    const data = await obtenerDatos(API_LOCALIDADES);
    if (data && data.localidades) {
        const localidadSelect1 = document.getElementById('localidad');
        data.localidades.forEach(localidad => {
            const option = document.createElement('option');
            option.value = localidad.nombre;
            option.textContent = localidad.nombre;
            localidadSelect1.appendChild(option);
        });
    }
}

// Llamada a las funciones para poblar los selects cuando se cargue la página
window.onload = () => {
    poblarProvincias();
    poblarLocalidades();
    poblarProvincias1();
    poblarLocalidades1();
};