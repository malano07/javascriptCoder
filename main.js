
//array con objetos para exportar al html

const productos = [
    {
        img: "./img/productos/buzo blanco.png",
        titulo: "Buzo Abs Blanco",
        precio: 45000,        
    },
    {
        img: "./img/productos/buzo bordo.png",
        titulo: "Buzo Abs Bordo",
        precio: 45000,
    },
    {
        img: "./img/productos/buzo rosa.png",
        titulo: "Buzo Abs Rosa",
        precio: 45000,
    },
    {
        img: "./img/productos/gorra blanca 2.jpg",
        titulo: "Gorra Blanca 2",
        precio: 25000,
    },
    {
        img: "./img/productos/gorra blanca 3.jpg",
        titulo: "Gorra Blanca 3",
        precio: 25000,
    },   
    {
        img: "./img/productos/gorra blanca.jpg",
        titulo: "Gorra Blanca",
        precio: 25000,
    },
    {
        img: "./img/productos/gorra blanco y roja.jpg",
        titulo: "Gorra Blanca y Roja",
        precio: 25000,
    },
    {
        img: "./img/productos/gorra gris.jpg",
        titulo: "Gorra Gris",
        precio: 25000,
    },
    {
        img: "./img/productos/gorra negra.jpg",
        titulo: "Gorra Negra",
        precio: 25000,
    },
    {
        img: "./img/productos/gorra negra 2.jpg",
        titulo: "Gorra Negra 2",
        precio: 25000,
    },
    {
        img: "./img/productos/gorra negra 3.jpg",
        titulo: "Gorra Negra 3",
        precio: 25000,
    },
    {
        img: "./img/productos/gorra negra 4.png",
        titulo: "Gorra Negra 4",
        precio: 25000,
    },
    {
        img: "./img/productos/gorra roja.jpg",
        titulo: "Gorra Roja",
        precio: 25000,
    },
    {
        img: "./img/productos/gorra verde 1.jpg",
        titulo: "Gorra Verde",
        precio: 25000,
    },
    {
        img: "./img/productos/gorra verde 2.jpg",
        titulo: "Gorra Verde 2",
        precio: 25000,
    },
    {
        img: "./img/productos/gorra verde 3.jpg",
        titulo: "Gorra Verde 3",
        precio: 25000,
    },
    {
        img: "./img/productos/gorro invierno.png",
        titulo: "Gorra Invierno",
        precio: 20000,
    },
    {
        img: "./img/productos/remera amarilla.png",
        titulo: "Remera Amarilla",
        precio: 27000,
    },
    {
        img: "./img/productos/remera negra.png",
        titulo: "Remera Negra",
        precio: 27000,
    },
    {
        img: "./img/productos/remera niño rosa.png",
        titulo: "Remera Niño Rosa",
        precio: 17000,
    }, 
    {
        img: "./img/productos/remera zul.png",
        titulo: "Remera Azul",
        precio: 27000,
    }, 
];

// Variables para los eventos y funciones

const contenedor_card = document.querySelector('.contenedor-card');
const contenedor_carro = document.querySelector('.contenedor-carro');
const totalCompra = document.getElementById('total-compra');
const valorEnvio = document.getElementById('valor-envio');
const totalPagar = document.getElementById('total-pagar');
const totalCuotas = document.getElementById('total-cuotas');
const cuotasInput = document.getElementById('cuotas');
const checkDomicilio = document.querySelector('.check-domicilio');

let total = 0;
let envio = 0;
cargarCarroDesdeLocalStorage()

// Creación e inserción de productos en el HTML recorriendo el array productos con el forEach

productos.forEach((producto) => {
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

            text: `agregaste ${producto.titulo}` ,
            avatar: `${producto.img}`,
            duration: 2000
            
            }).showToast();
    });

    div.append(button);
    contenedor_card.append(div);
});



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
    let totalConInteres = total + (total * 0.10 * cuotas);
    totalCuotas.innerText = totalConInteres + envio;
}

cuotasInput.addEventListener('input', calcularCuotas);
checkDomicilio.addEventListener('change', actualizarTotales);

