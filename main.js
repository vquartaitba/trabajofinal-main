// Variables
const baseDeDatos = [
    {
        id: 1,
        nombre: 'Big Pons Simple + Papas Fritas',
        precio: 1500,
        imagen: 'images/slide02.jpg'
    },
    {
        id: 2,
        nombre: 'Sweet Onion Doble + Papas Fritas',
        precio: 2000,
        imagen: 'images/slide02.jpg'
    },
    {
        id: 3,
        nombre: 'Grilled Onion + Papas Fritas',
        precio: 800,
        imagen: 'images/slide02.jpg'
    },
    {
        id: 4,
        nombre: 'Royal Doble + Papas Fritas',
        precio: 1300,
        imagen: 'images/slide02.jpg'
    },
    {
        id: 5,
        nombre: 'California doble + Papas fritas',
        precio: 2000,
        imagen: 'images/slide02.jpg'
    },
    {
        id: 6,
        nombre: 'Sweet ´n´ Spicy Doble + Papas fritas',
        precio: 3000,
        imagen: 'images/slide02.jpg'
    },
];

let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const DOMbotonFinalizar = document.querySelector('#liveToastBtn');

function renderizarProductos() {
    baseDeDatos.forEach((info) => {

        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-5');

        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');

        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;

        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('card-img-top');
        miNodoImagen.setAttribute('src', info.imagen);

        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = `${info.precio}${divisa}`;

        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', añadirProductoAlCarrito);

        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}


function añadirProductoAlCarrito(evento) {

    carrito.push(evento.target.getAttribute('marcador'))

    renderizarCarrito();

}


function renderizarCarrito() {

    DOMcarrito.textContent = '';

    const carritoSinDuplicados = [...new Set(carrito)];

    carritoSinDuplicados.forEach((item) => {

        const miItem = baseDeDatos.filter((itemBaseDatos) => {

            return itemBaseDatos.id === parseInt(item);
        });

        const numeroUnidadesItem = carrito.reduce((total, itemId) => {

            return itemId === item ? total += 1 : total;
        }, 0);

        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;

        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);

        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });

    DOMtotal.textContent = calcularTotal();
}


function borrarItemCarrito(evento) {

    const id = evento.target.dataset.item;

    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });

    renderizarCarrito();
}

function calcularTotal() {

    return carrito.reduce((total, item) => {

        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });

        return total + miItem[0].precio;
    }, 0).toFixed(2);
}


function vaciarCarrito() {

    carrito = [];

    renderizarCarrito();
}

function finalizarCompra() {

    carrito = [];
    total= 0;
    renderizarCarrito();
}

DOMbotonVaciar.addEventListener('click', vaciarCarrito);
DOMbotonFinalizar.addEventListener('click', finalizarCompra);


renderizarProductos();
renderizarCarrito();



