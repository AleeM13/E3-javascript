const form = document.getElementById('form');
const inputNumber = document.getElementById('num');
const showPizza = document.getElementById('pizza');
const deleteAll = document.getElementById('borrar');
const deleteUno = document.getElementById('borrarUno')
const msg = document.getElementById('msg');

const arrayPizzas = [
    {id: 1, nombre: 'Napolitana', ingredientes: ['salsa de tomate', 'muzzarella', 'rodajas de tomate', 'ajo', 'perejil', 'aceitunas'], precio: '1500'},
    {id: 2, nombre: 'Fugazzeta', ingredientes: ['muzzarella', 'cebolla', 'aceitunas'], precio: '1050'},
    {id: 3, nombre: '4 Quesos', ingredientes: ['salsa de tomate', 'muzarella', 'provolone', 'parmesano', 'roquefort', 'aceitunas'], precio: '1500'},
    {id: 4, nombre: 'Roquefort', ingredientes: ['salsa de tomate', 'muzzarella', 'roquefort', 'aceitunas'], precio: '1350'},
    {id: 5, nombre: 'Vegetariana', ingredientes: ['muzarrella', 'salsa blanca', 'acelga', 'oregano', 'aceitunas'], precio: '1050'},
    {id: 6, nombre: 'Especial', ingredientes: ['salsa de tomate', 'muzzarella', 'jamon', 'rodajas de tomate', 'provenzal', 'huevo', 'morrones'], precio: '1150'},
    {id: 7, nombre: 'Muzzarella', ingredientes: ['salsa de tomate', 'muzzarella', 'rodajas de tomate', 'oregano', 'aceitunas'], precio: '950'},
    {id: 8, nombre: 'Calabresa', ingredientes: ['salsa de tomate', 'muzzarella', 'longaniza', 'aji molido', 'aceitunas'], precio: '1200'}
];

let pizzas = JSON.parse(localStorage.getItem('arrayPizzas')) || [];

const saveLocalStorage = () => {
    localStorage.setItem('arrayPizzas', JSON.stringify(pizzas))
};

const saveData = () => {
    pizzas = [
        ...pizzas,
        {
            id: pizzas.length++,

        }
    ]
}

const renderPizza = (pizza) => {
    const {nombre, precio} = pizza;
    `
        <div class="card">
        <div class="titulos">
        <h2> Pizza: ${nombre} </h2>
        <h4> Precio: ${precio} </h4>
        </div>
        <div class="btn_container">
        <div class="btn"><img src="./img/borrar.png" alt="botón de borrar" id="borrarUno"></div>
        </div>
        </div>   
    `
}

const renderPizzas = () => {
    showPizza.innerHTML = pizzas.map((pizza) => renderPizza(pizza)).join('');
}

const checkInput = () => {
    let valid = false;
    const valueInput = inputNumber.value.trim();
    if (valueInput == 0) {
        showError('Ingresa un valor mayor que 0 y menor a 9');
    } else if (isEmpty(valueInput)){
        showError('El valor ingresado no es valido')
    } else {
        clearError();
        valid = true;
    }
    return valid
}

const isEmpty = (value) => value === !value.length;

const showError = (message) => {
    const error = document.getElementById('msg');
    error.textContent = message;
}

const clearError = () => {
    const error = document.getElementById('msg');
    error.textContent = "";
}

const hideDeleteAll = pizzas => {
    if (!pizzas.length) {
        deleteAll.classList.add('hidden');
        return
    }
    deleteAll.classList.remove('hidden');
}

const removeAll = () => {
    pizzas = [];
    renderPizzas(pizzas);
    saveLocalStorage(pizzas);
    hideDeleteAll(pizzas);
}

const agregarPizza = e => {
    e.preventDefault();
    saveData();
    saveLocalStorage();
    let input = parseInt(inputNumber.value);
    let miPizza = arrayPizzas.filter(pizza => pizza.id === input);
    console.log(miPizza);
    renderPizzas(miPizza);
}


const init = () => {
    renderPizzas(pizzas);
    form.addEventListener('submit', agregarPizza);
    deleteAll.addEventListener('click', removeAll);
    hideDeleteAll(pizzas);
};

init();