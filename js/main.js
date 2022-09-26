const form = document.getElementById('form');
const inputNumber = document.getElementById("num");
const showPizza = document.getElementById('pizza');

const arrayPizzas = [
    {id: 1, nombre: 'Napolitana', imagen: "./img/pizza-napolitana.jpg", ingredientes: ['salsa de tomate', 'muzzarella', 'rodajas de tomate', 'ajo', 'perejil', 'aceitunas'], precio: '$1500'},
    {id: 2, nombre: 'Fugazzeta', imagen: "./img/pizza-fugazza.jpg", ingredientes: ['muzzarella', 'cebolla', 'aceitunas'], precio: '$1050'},
    {id: 3, nombre: '4 Quesos', imagen: "./img/pizza-4-quesos.jpg", ingredientes: ['muzarella', 'provolone', 'parmesano', 'roquefort', 'aceitunas'], precio: '$1500'},
    {id: 4, nombre: 'Roquefort', imagen: "./img/pizza-roquefort.png", ingredientes: ['salsa de tomate', 'muzzarella', 'roquefort', 'aceitunas'], precio: '$1350'},
    {id: 5, nombre: 'Vegetariana', imagen: "./img/pizza-vegetariana.jpg", ingredientes: ['muzarrella', 'salsa blanca', 'acelga', 'oregano', 'aceitunas'], precio: '$1050'},
    {id: 6, nombre: 'Especial', imagen: "./img/pizza-especial.jpg", ingredientes: ['salsa de tomate', 'muzzarella', 'jamon', 'rodajas de tomate', 'provenzal', 'huevo', 'morrones'], precio: '$1150'},
    {id: 7, nombre: 'Muzzarella', imagen: "./img/pizza-muzzarella.jpg", ingredientes: ['salsa de tomate', 'muzzarella', 'rodajas de tomate', 'oregano', 'aceitunas'], precio: '$950'},
    {id: 8, nombre: 'Calabresa', imagen: "./img/pizza-calabresa.jpg", ingredientes: ['salsa de tomate', 'muzzarella', 'longaniza', 'aji molido', 'aceitunas'], precio: '$1200'}
];

let miPizza = JSON.parse(localStorage.getItem("pizzas")) || [];
const saveLocalStorage = pizzas => localStorage.setItem("pizzas", JSON.stringify(pizzas));

const renderPizza = pizza => { 
    if (pizza.length !== 0) { 
        showPizza.innerHTML = 
    `<div class="card"><h2>Pizza ${pizza.nombre}:</h2>
    <div class="pizza-img">
    <img src="${pizza.imagen}" alt="pizza">
    </div> 
    <p>Ingredientes: ${pizza.ingredientes}.</p>
    <h4> Precio: ${pizza.precio}</h4></div>`;
    };
}


function mostrar(e) {
    e.preventDefault()
    const valueInput = inputNumber.value.trim();
    if (arrayPizzas.some(item => item.id == valueInput)) {
        let pizza = arrayPizzas.find(item => item.id == valueInput);
        renderPizza(pizza);
        saveLocalStorage(pizza);
        inputNumber.classList.remove("error")
        clearError();
    } else if (valueInput >= 9 || valueInput <= 0) {
        inputNumber.classList.add("error")
        showError('Ingresa un número valido')
    } else if (isEmpty(valueInput)) {
        inputNumber.classList.add("error")
        showError('Ingresa un número')
    };
    inputNumber.value = "";
}

const isEmpty = (value) => value === !value.length;

const showError = (message) => {
    const msg = document.querySelector('small');
    msg.textContent = message;
}

const clearError = () => {
    const msg = document.querySelector('small');
    msg.textContent = "";
}

form.addEventListener("submit", mostrar);


window.onload = renderPizza(miPizza);