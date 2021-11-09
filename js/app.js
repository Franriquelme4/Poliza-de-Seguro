// constructotes
function Seguro(marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
Seguro.prototype.cotizarSeguro = function() {
    /*
    1= Americano valor en 1,15
    2 = asiatico 1,05
    3 = europeo 1,35
    */
    let cantidad;
    const base = 2000;
    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
    }
    //leer year
    const diferencia = new Date().getFullYear() - this.year;
    // cada year que es menor dismuniye en 3 
    cantidad -= ((diferencia * 3) * cantidad) / 100;


    /*
        Si es basico se ,ultiplica por el 30% mas
        si es completo por un 50 $ mas
    */

    if (this.type === 'basico') {
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50;
    }
    return cantidad;
}

function UI() {};
UI.prototype.llenarOpciones = () => {
        const max = new Date().getFullYear();
        const min = max - 20;
        const select = document.querySelector('#year');
        console.log(max, min);
        for (let i = max; i > min; i--) {
            let option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            select.appendChild(option);
        }
    }
    //muestra mensaje
UI.prototype.muestraMensaje = (mensaje, tipo) => {
    const div = document.createElement('div');
    if (tipo === 'error') {
        div.classList.add('error');
    } else {
        div.classList.add('correcto');
    }
    div.classList.add('mensaje', 'mt-10');

    div.textContent = mensaje;
    // insertar 
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));
    setTimeout(() => {
        div.remove();
    }, 3000);

}
UI.prototype.mostrarResultado = (seguro, total) => {
    console.log(seguro);
    const { marca, year, tipo } = seguro;
    let txtMarca;
    switch (marca) {
        case '1':
            txtMarca = "Americano";
            break;
        case '2':
            txtMarca = "Asiatico";
            break;
        case '3':
            txtMarca = "Europeo";
            break;

        default:
            break;
    }
    const div = document.createElement('div');
    div.classList.add('mt-10');
    div.innerHTML = `
    <p class='header'>Tu resumen</p>
    <p>Marca: ${txtMarca}</p>
    <p>Year: ${year}</p>
    <p class="capitalize">Tipo: ${tipo}</p>
    <p class='font-bold'><span class='font-normal'>Total ${total}</span></p>
    `;
    const resultadoDiv = document.querySelector('#resultado');

    // mostrar spienner

    const sppinner = document.querySelector('#cargando');
    sppinner.style.display = 'block';
    setTimeout(() => {
        sppinner.style.display = 'none';
        resultadoDiv.appendChild(div);
    }, 3000);
}
const ui = new UI();
console.log(ui);
document.addEventListener('DOMContentLoaded', () => {
    console.log('hola');
    ui.llenarOpciones();
});
eventListener();

function eventListener() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizando);

}

function cotizando(e) {
    e.preventDefault();

    //leer la marca 
    const marca = document.querySelector('#marca').value;
    //leer el anho
    const year = document.querySelector('#year').value;

    // leer el tipo de cobertura 
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    if (marca === '' || year === '' || tipo === '') {
        ui.muestraMensaje('Todos los campos son obligatorios', 'error');
        return;
    }
    ui.muestraMensaje('Cotizando', 'exito');
    //ocultar las cotizaciones previas 
    const resultado = document.querySelector('#resultado div');
    if (resultado != null) {
        resultado.remove();
    }

    //cotizando
    const newSeguro = new Seguro(marca, year, tipo);
    const valorSeguro = newSeguro.cotizarSeguro();
    ui.mostrarResultado(newSeguro, valorSeguro);
}