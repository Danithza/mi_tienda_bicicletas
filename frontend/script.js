document.addEventListener("DOMContentLoaded", cargarBicicletas);

async function cargarBicicletas() {
    try {
        const response = await fetch('http://localhost:3001/api/bicicletas');
        const bicicletas = await response.json();
        mostrarBicicletas(bicicletas);
    } catch (error) {
        console.error("Error al cargar las bicicletas:", error);
    }
}

function mostrarBicicletas(bicicletas) {
    const seleccionBicicleta = document.getElementById("seleccion-bicicleta");
    seleccionBicicleta.innerHTML = ''; // Limpiar opciones previas
    bicicletas.forEach(bicicleta => {
        const option = document.createElement("option");
        option.value = bicicleta.id;
        option.textContent = bicicleta.nombre;
        seleccionBicicleta.appendChild(option);
    });
}

async function cargarBicicletas() {
    try {
        const response = await fetch('http://localhost:3001/api/bicicletas');
        const bicicletas = await response.json();
        console.log(bicicletas); // Esto mostrará el contenido de la respuesta en la consola
        mostrarBicicletas(bicicletas);
    } catch (error) {
        console.error("Error al cargar las bicicletas:", error);
    }
}


function mostrarDetallesBicicleta(bicicleta) {
    const detallesDiv = document.getElementById("detalles-bicicleta");
    detallesDiv.innerHTML = `
        <h2>${bicicleta.nombre}</h2>
        <p>Precio: $${bicicleta.precio}</p>
        <p>Descripción: ${bicicleta.descripcion}</p>
        <p>Stock: ${bicicleta.stock}</p>
    `;
}

async function buscarBicicleta() {
    const id = document.getElementById("seleccion-bicicleta").value;
    if (!id) {
        alert("Selecciona una bicicleta");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3001/api/bicicletas/${id}`);
        const bicicleta = await response.json();
        mostrarDetallesBicicleta(bicicleta);
    } catch (error) {
        console.error("Error al buscar la bicicleta:", error);
    }
}


// Funciones para abrir y cerrar modales
function abrirModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function cerrarModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}









// Función para eliminar la búsqueda actual
function eliminarBusqueda() {
    const seleccionBicicleta = document.getElementById("seleccion-bicicleta");
    seleccionBicicleta.selectedIndex = 0; // Restablece el selector a la opción por defecto
    document.getElementById("detalles-bicicleta").innerHTML = ""; // Limpia los detalles mostrados
    alert("Búsqueda eliminada.");
}

// Función para añadir al carrito
let carrito = []; // Inicializa el carrito

// Función para añadir al carrito
function anadirAlCarrito() {
    const id = document.getElementById("seleccion-bicicleta").value;
    if (!id) {
        alert("Selecciona una bicicleta antes de añadir al carrito.");
        return;
    }

    // Obtén el nombre y precio de la bicicleta seleccionada
    const bicicletaNombre = document.querySelector(`#seleccion-bicicleta option[value="${id}"]`).textContent;
    const bicicletaPrecio = 100; // Reemplaza esto con el precio real de la bicicleta

    // Añadir la bicicleta al carrito
    carrito.push({ id, nombre: bicicletaNombre, precio: bicicletaPrecio });
    
    // Actualizar la lista de carrito
    actualizarCarrito();
    alert(`${bicicletaNombre} añadida al carrito.`);
}

// Función para actualizar el carrito visualmente
function actualizarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    listaCarrito.innerHTML = ""; // Limpia la lista previa
    let total = 0;

    carrito.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} - $${item.precio}`;
        listaCarrito.appendChild(li);
        total += item.precio;
    });

    document.getElementById("total-carrito").textContent = total; // Actualiza el total
}

// Función para generar la compra
function generarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Añade productos antes de generar la compra.");
        return;
    }
    
    // Aquí puedes añadir la lógica para procesar el pago o la compra
    alert(`Compra generada con éxito. Total: $${document.getElementById("total-carrito").textContent}`);
    
    // Limpiar el carrito después de la compra
    carrito = [];
    actualizarCarrito();
}
