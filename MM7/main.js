
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


// variables para los eventos y funciones

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

// creacion e insercion de productos en el html recorriendo el array con el for each


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
    });

    div.append(button);
    contenedor_card.append(div);
});

// funcion de agregar al carro que se usa con el boton agregar de cada producto

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
    });

    div.append(button);
    contenedor_carro.append(div);

    total += producto.precio;
    actualizarTotales();
}

// funcion de eliminar del carro

function eliminarDelCarro(div, precio) {
    div.remove();
    total -= precio;
    actualizarTotales();
}

// funcion para agregar el costo del envio en caso que este confirmado el check box
function actualizarTotales() {
    totalCompra.innerText = total;
    if (checkDomicilio.checked) {
        envio = 5000;
    } else {
        envio = 0;
    }
    valorEnvio.innerText = envio;
    totalPagar.innerText = total + envio;

    calcularCuotas();
}

// funcion para calcular interes en las cuotas

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