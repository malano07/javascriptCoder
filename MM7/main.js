
document.addEventListener('DOMContentLoaded', () => {

   



    const contenedorCard = document.querySelector('.contenedor-card');

    // Función para cargar los productos desde el JSON local
    const cargarProductos = async () => {
        try {
            const respuesta = await fetch('../data/productos.json');
            const productos = await respuesta.json();

            // Crear tarjetas para cada producto
            productos.forEach(producto => {
                let div = document.createElement('div');
                div.classList.add('card');
                div.innerHTML = `
                    <img src="${producto.img}" alt="producto">   
                    <h3>${producto.titulo}</h3>
                    <h4>$ ${producto.precio}</h4>
                `;

                let button = document.createElement('button');
                button.classList.add('boton-agregar');
                button.innerText = "Agregar";
                button.addEventListener('click', () => {
                    agregarAlCarro(producto);
                    Toastify({
                        text: `Agregaste ${producto.titulo}`,
                        avatar: `${producto.img}`,
                        duration: 2000
                    }).showToast();
                });

                div.append(button);
                contenedorCard.append(div);
            });

        } catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    };

    // Llamada a la función para cargar los productos
    cargarProductos();


 const totalCompra = document.getElementById('total-compra');
const valorEnvio = document.getElementById('valor-envio');
const totalPagar = document.getElementById('total-pagar');
const totalCuotas = document.getElementById('total-cuotas');
const cuotasInput = document.getElementById('cuotas');
const checkDomicilio = document.querySelector('.check-domicilio');
const contenedor_carro = document.querySelector('.contenedor-carro');


let total = 0;
let envio = 0;
cargarCarroDesdeLocalStorage()





// Función de agregar al carrito que se usa con el botón agregar de cada producto del DOM

function agregarAlCarro(producto) {
    let div = document.createElement('div');
    div.classList.add('card-carro');
    div.innerHTML = `
        <img src="${producto.img}" alt="producto">
        <h3>${producto.titulo}</h3>
        <h4>$ ${producto.precio}</h4>
    `;

    let button = document.createElement('button');
    button.classList.add('boton-eliminar');
    button.innerText = "Eliminar";
    button.addEventListener('click', () => {
        eliminarDelCarro(div, producto.precio);
        Toastify({

            text: `Eliminaste ${producto.titulo}` ,
            avatar: `${producto.img}`,
            duration: 2000           
            }).showToast();
    });

    div.append(button);
    contenedor_carro.append(div);

    total += producto.precio;
    actualizarStorage(); 
    actualizarTotales();
}

// Función de eliminar del carrito

function eliminarDelCarro(div, precio) {
    div.remove();
    total -= precio;
    actualizarStorage(); 
    actualizarTotales();
}

// creo carrito y meto los productos que se agregan ... luego los guardo en localStorage

function actualizarStorage() {
    const carrito = {
        items: [],
        total,
        envio,
    };

    contenedor_carro.querySelectorAll('.card-carro').forEach(card => {
        const producto = {
            img: card.querySelector('img').src,
            titulo: card.querySelector('h3').innerText,
            precio: parseInt(card.querySelector('h4').innerText.replace('$ ', ''))
        };
        carrito.items.push(producto);
    });

    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Recuperar info de localStorage y cargarlo al carrito -- uso de operador avanzado or 

function cargarCarroDesdeLocalStorage() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || { items: [], total: 0, envio: 0 };

    carrito.items.forEach(producto => {
        let div = document.createElement('div');
        div.classList.add('card-carro');
        div.innerHTML = `
            <img src="${producto.img}" alt="producto">
            <h3>${producto.titulo}</h3>
            <h4>$ ${producto.precio}</h4>
        `;

        let button = document.createElement('button');
        button.classList.add('boton-eliminar');
        button.innerText = "Eliminar";
        button.addEventListener('click', () => {
            eliminarDelCarro(div, producto.precio);
        });

        div.append(button);
        contenedor_carro.append(div);

        total += producto.precio;
    });

    envio = carrito.envio;
    actualizarTotales();
}

// Función para agregar el costo del envío en caso de que esté confirmado el checkbox -- uso de ternario

function actualizarTotales() {
    totalCompra.innerText = total;
    envio = checkDomicilio.checked ? 5000 : 0;
    valorEnvio.innerText = envio;
    totalPagar.innerText = total + envio;

    calcularCuotas();
}

// Función para calcular interés en las cuotas

function calcularCuotas() {
    let cuotas = parseInt(cuotasInput.value);
    if (isNaN(cuotas) || cuotas < 1 || cuotas > 12) {
        cuotasInput.value = '';
        totalCuotas.innerText = 0;
        return;
    }
    let totalConInteres = total * (1 + 0.10 * cuotas);
    totalCuotas.innerText = totalConInteres + envio;
}

cuotasInput.addEventListener('input', calcularCuotas);
checkDomicilio.addEventListener('change', actualizarTotales);

 // alert en boton pagar

 const botonPagar = document.querySelector('.boton-pagar');
    
 botonPagar.addEventListener('click', () => {
     Swal.fire({
         icon: 'success',
         title: '¡Pago Acreditado!',
         text: 'Tu pago se acreditó correctamente',
         confirmButtonText: 'Aceptar',
     });
 });

 const botonSuscribir = document.getElementById('boton-suscribir');
    
    botonSuscribir.addEventListener('click', (event) => {
        event.preventDefault(); // Evitar que se envíe el formulario inmediatamente
        
        Swal.fire({
            icon: 'success',
            title: '¡Suscripción exitosa!',
            text: 'Te has suscrito correctamente. Pronto recibirás nuestras novedades.',
            confirmButtonText: 'Aceptar',
        }).then((result) => {
            if (result.isConfirmed) {
                // Aquí puedes enviar el formulario si lo deseas
                botonSuscribir.closest('form').submit();
            }
        });
    });


});




     