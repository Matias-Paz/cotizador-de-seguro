// Constructores
function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
};

// Realiza la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function(){
    /*
        1 = Americano 1.15;
        2 = Asiatico 1.05;
        3 = Europeo 1.35;
    */

    let cantidad;
    const base = 2000;
    
    // switch (this.marca) {
        // case '1':
            // cantidad = base * 1.15;
            // break;

        // case '2':
            // cantidad = base * 1.05;
            // break;
            
        // case '3':
            // cantidad = base * 1.35;
            // break;
            
        // default:
            // break;
    // };

    const tipoPago = {
        "1": cantidad = base * 1.15,
        "2": cantidad = base * 1.05,
        "3": cantidad = base * 1.35,
    }

    cantidad = tipoPago[this.marca];


    // Leer el año
    const diferencia = new Date().getFullYear() - this.year;

    // Cada año que la diferencia es mayor, el costo va a reducirce el 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100; 
    // console.log(cantidad);

    /*
        Si el seguro es basico se multiplica por un +30%
        Si el seguro es completo se multiplica por un +50%
    */

    // if(this.tipo === 'basico') {
        // cantidad *= 1.30;
    // } else {
        // cantidad *= 1.50;
    // }
    this.tipo === 'basico' ? cantidad *= 1.3 : cantidad *= 1.5;
    
    return cantidad;
};

function UI() {};

// Llenar las opciones de los años
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear(),
          min = max - 20;  

    const selectYear = document.querySelector('#year');
    
    for (let i = max; i >= min ; i--) {
        let option = document.createElement('option');        
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    };
};

// Muestra alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {

    const div = document.createElement('div');
    
    // if (tipo === 'error') {
        // div.classList.add('error');
    // } else {
        // div.classList.add('correcto');   
    // }
    tipo === 'error' ? div.classList.add('error') : div.classList.add('correcto');

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    // Insetar en el HTML
    const formulario = document.querySelector('#cotizar-seguro');
    const resultado = document.querySelector('#resultado');
    formulario.insertBefore(div, resultado);

    setTimeout(() =>{
        div.remove();
    }, 3000);
}


UI.prototype.mostrarResultado = (seguro, total) =>{

    const {marca, year, tipo} = seguro;
    let textMarca;

    // switch (marca) {
        // case '1':
            // textMarca = "Americano";
            // break;

        // case '2':
            // textMarca = "Asiatico";
            // break;
            
        // case '3':
            // textMarca = "Europeo";
            // break;
            
        // default:
            // break;
    // };

    const marcaAuto = {
        1: textMarca = "Americano",
        2: textMarca = "Asiatico",
        3: textMarca = "Europeo",
    };

    textMarca = marcaAuto[marca];

    // Crear resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
        <p class='header'>Tu Resumen</p>
        <p class='font-bold'>La marca:<span class='font-normal'> ${textMarca}</span> </p>
        <p class='font-bold'>El año:<span class='font-normal'> ${year}</span> </p>
        <p class='font-bold'>El tipo de auto:<span class='font-normal capitalize'> ${tipo}</span> </p>
        <p class='font-bold'>Total:<span class='font-normal'> $ ${total}</span> </p>
    `;

    const resultadoDiv = document.querySelector('#resultado'); 
    
    // Mostrar el spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display ='block';
    
    setTimeout(() => {
        spinner.style.display = 'none';               // Se borra el spinner 
        resultadoDiv.appendChild(div);  // Pero se muestra el resultadoDiv
    }, 3000);
};







// Instancia UI(siempre dsps de crear los prototypes)
const ui = new UI();
// console.log(ui);

document.addEventListener('DOMContentLoaded', () =>{
    ui.llenarOpciones(); // Llena el select con los años   
});

eventListener();

function eventListener(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
};

function cotizarSeguro(e) {
    e.preventDefault();

    // Leer la marca seleccionado
    const marca = document.querySelector('#marca').value;
    // console.log(marca);

    // Leer el año seleccionado
    const year = document.querySelector('#year').value;
    // console.log(year);

    // Leer el tipo de cobertura
    const tipo = document.querySelector('input[name ="tipo"]:checked').value;
    // console.log(tipo);

    // console.log('Cotizando...');

    if (marca === '' || year === '' || tipo === '') {
        // console.log('No paso la validación');
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }
    // console.log('Si paso la validación');
    ui.mostrarMensaje('Cotizando...', 'exito');
    
    // marca === '' || year === '' || tipo === '' ? console.log('No paso la validación') : console.log('Si paso la validación');
    // marca === '' || year === '' || tipo === '' ? ui.mostrarMensaje('Todos los campos son obligatorios', 'error') : ui.mostrarMensaje('Cotizando...', 'exito');

    
    // Ocultar las cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    if (resultados != null) {
        resultados.remove();
    }
    
    // Instanciar el seguro 
    const seguro = new Seguro(marca, year, tipo);
    // console.log(seguro);
    const total = seguro.cotizarSeguro();
    
    // Utilizar el prototype que va a cotizar
    ui.mostrarResultado(seguro, total);
};