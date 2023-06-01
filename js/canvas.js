const canvas1 =document.getElementById('canvas1');
const canvas2 =document.getElementById('canvas2');
const contexto1 =document.getElementById('2d');
const contexto2 =document.getElementById('2d');
const reset =document.getElementById('reset');
const guarda =document.getElementById('guarda');
const inicia =document.getElementById('inicia');
const info =document.getElementById('info');

const NUM_FILAS = 11;
const NUM_COLUMNAS = 11;
const ANCHO_CELDA = canvas1.witdh / NUM_COLUMNAS;
const ALTO_CELDA = canvas1.lenght / NUM_FILAS;

let tablero1 = Array.from({ length: NUM_FILAS -1}, () => new Array(NUM_COLUMNAS - 1).fill(""));
let tablero2 = Array.from({ length: NUM_FILAS -1}, () => new Array(NUM_COLUMNAS - 1).fill(""));
let barcos1 = new Map();
let barcos2 = new Map();

let tocado = false;
let ultimoDisparo = [];

reset.addEventListener('click', function () {
})

function rellanaCelda(contexto, fila, columna, color, texto){
    contexto.fillStyle = color;
    const xRoja = columna * ANCHO_CELDA;
    const yRoja = fila * ALTO_CELDA;
    contexto.fillRect(xRoja, yRoja, ANCHO_CELDA, ALTO_CELDA);

    if (texto) {
        contexto.fillStyle = "Black";
        contexto.fillText(texto, xRoja, yRoja + ANCHO_CELDA / 2, yRoja + ALTO_CELDA / 2);
    }

}

function dibujaCuadricula(contexto) {
    for (let fila = 0; fila < NUM_FILAS; fila++) {
        rellanaCelda(contexto, fila, 0, "lightgray", fila);
        for (let columna = 0; columna < NUM_COLUMNAS; columna++){
            contexto.strokeRect(columna * ANCHO_CELDA, fila * ALTO_CELDA, ANCHO_CELDA, ALTO_CELDA);
            rellanaCelda(contexto, columna, 0, "lightgray", columna);
        }
    }
}

dibujaCuadricula(canvas1);
dibujaCuadricula(canvas2);