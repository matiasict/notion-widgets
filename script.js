function actualizarDatos() {
    const apiUrl1 = 'https://mercados.ambito.com/dolarrava/cl/variacion';
    const apiUrl2 = 'https://mercados.ambito.com/dolar/informal/variacion';

    // Función para actualizar datos de la primera acción
    fetch(apiUrl1)
        .then(response => response.json())
        .then(data => {
            const valorElement = document.getElementById('valor1');
            const valoracionElement = document.getElementById('valoracion1');
            const flechaElement = document.getElementById('flecha1');
            const variacionElement = document.getElementById('variacion1');
            const fechaElement = document.getElementById('fecha1');

            const valor = data.valor;
            const valoracion = data.variacion;
            const fecha = data.fecha;

            valorElement.textContent = valor;
            flechaElement.textContent = '';

            // Agrega la flecha y el color según la valoración
            if (data['class-variacion'] === 'up') {
                flechaElement.textContent = '↑';
                flechaElement.classList.add('up');
                variacionElement.style.color = 'green';
            } else {
                flechaElement.textContent = '↓';
                flechaElement.classList.add('down');
                variacionElement.style.color = 'red';
            }

            variacionElement.textContent = valoracion;
            fechaElement.textContent = fecha;
        })
        .catch(error => {
            console.error('Error al cargar los datos de la acción 1:', error);
        });

    // Función para actualizar datos de la segunda acción
    fetch(apiUrl2)
        .then(response => response.json())
        .then(data => {
            const flechaElement = document.getElementById('flecha2');
            const variacionElement = document.getElementById('variacion2');
            const fechaElement = document.getElementById('fecha2');
            const compraElement = document.getElementById('dbcompra');
            const ventaElement = document.getElementById('dbventa');
            const valorMedioElement = document.getElementById('valorMedio');


            const valorCompra = data.compra;
            const valorVenta = data.venta;
            const valoracion = data.variacion;
            const fecha = data.fecha;
            const valorMedio = (parseFloat(valorCompra) + parseFloat(valorVenta)) / 2;

            compraElement.textContent = valorCompra;
            ventaElement.textContent = valorVenta;
            valorMedioElement.textContent = valorMedio;
            flechaElement.textContent = '';

            // Agrega la flecha y el color según la valoración
            if (data['class-variacion'] === 'up') {
                flechaElement.textContent = '↑';
                flechaElement.classList.add('up');
                variacionElement.style.color = 'green';
            } else {
                flechaElement.textContent = '↓';
                flechaElement.classList.add('down');
                variacionElement.style.color = 'red';
            }

            variacionElement.textContent = valoracion;
            fechaElement.textContent = fecha;
        })
        .catch(error => {
            console.error('Error al cargar los datos de la acción 2:', error);
        });
}

// Llama a la función de actualización cada 10 minutos (en milisegundos)
setInterval(actualizarDatos, 600000);

// Llama a la función de actualización al cargar la página
actualizarDatos();

// Agrega un evento de clic al botón de actualización
const refreshButton = document.getElementById('refreshButton');
if (refreshButton) {
    refreshButton.addEventListener('click', () => {
        // Forzar la actualización de datos cuando se hace clic en el botón
        actualizarDatos();
    });
}