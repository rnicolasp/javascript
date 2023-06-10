const canvas1 = document.getElementById('canvas1');
const context1 = canvas1.getContext('2d');
const canvas2 = document.getElementById('canvas2');
const context2 = canvas2.getContext('2d');
const tamañoCelda = 40; // tamaño de cada celda
const numCeldas = 10; // numero de celds y columnas

let tablero1 = createEmptyBoard();
let tablero2 = createEmptyBoard();
let finPartida = false;
let cambioLog = [];

// crear tableros vacios
function createEmptyBoard() {
    const tablero = new Array(numCeldas);
    for (let i = 0; i < numCeldas; i++) {
        tablero[i] = new Array(numCeldas);
        for (let j = 0; j < numCeldas; j++) {
            tablero[i][j] = {
                hayBarco: false, // dice si hay un barco en la celda
                celdaGolpeada: false // indica si la celda ha sido tocada antes
            };
        }
    }
    return tablero;
}

// generar barcos aleatorios en los dos tablers
function generarBarcosAleatorios(board) {
    const tamañoBarcos = [5, 4, 3, 2, 2]; // longitudes de los barcos y la cantidad
    for (let length of tamañoBarcos) {
        let isHorizontal = Math.random() < 0.5; // determina si el barco es horizontal o vertical
        let barcoColocado = false;
        while (!barcoColocado) { // aqui se crean los barcos en las celdad
            let x, y;
            if (isHorizontal) {
                x = Math.floor(Math.random() * (numCeldas - length + 1));
                y = Math.floor(Math.random() * numCeldas);
            } else {
                x = Math.floor(Math.random() * numCeldas);
                y = Math.floor(Math.random() * (numCeldas - length + 1));
            }
            if (puedeColocarBarco(board, x, y, length, isHorizontal)) {
                colocarBarco(board, x, y, length, isHorizontal);
                barcoColocado = true;
            }
        }
    }
}

// func para verificar si se puede colocar un barco en una posición indicada, la llama generarBarcos
function puedeColocarBarco(board, x, y, length, isHorizontal) {
    if (isHorizontal) {
        for (let i = x; i < x + length; i++) {
            if (board[i][y].hayBarco) {
                return false; // Hay una colisión con otro barco
            }
        }
    } else {
        for (let j = y; j < y + length; j++) {
            if (board[x][j].hayBarco) {
                return false; // Hay una colisión con otro barco
            }
        }
    }
    return true; // Si no hay colisiones acaba
}

// funcion para colocar un barco en la posicion comprobada arriba
function colocarBarco(board, x, y, length, isHorizontal) {
    if (isHorizontal) {
        for (let i = x; i < x + length; i++) {
            board[i][y].hayBarco = true; // coloca barco
        }
    } else {
        for (let j = y; j < y + length; j++) {
            board[x][j].hayBarco = true;
        }
    }
}

// esto dibujo el tablero en el canvas con los parametros
function dibujarTabla(context, board) {
    context.clearRect(0, 0, canvas1.width, canvas1.height);

    for (let i = 0; i < numCeldas; i++) {
        for (let j = 0; j < numCeldas; j++) {
            if (board[i][j].isHit) {
                if (board[i][j].hayBarco) {
                    context.fillStyle = 'red'; // celda golpeada con un barco
                } else {
                    context.fillStyle = 'lightblue'; // celda golpeada sin barco
                }
            } else {
                if (board[i][j].hayBarco) {
                    context.fillStyle = 'gray'; // celda con un barco
                } else {
                    context.fillStyle = 'white'; // celda de agua transparente
                }
            }

            context.fillRect(i * tamañoCelda, j * tamañoCelda, tamañoCelda, tamañoCelda); // se rellenan las celdas
            context.strokeRect(i * tamañoCelda, j * tamañoCelda, tamañoCelda, tamañoCelda);
        }
    }
}

// compruba si aun queda algun barco sin hundir 
function comprovarFinalPartida(board) {
    for (let i = 0; i < numCeldas; i++) {
        for (let j = 0; j < numCeldas; j++) {
            if (board[i][j].hayBarco && !board[i][j].isHit) {
                return false; // auin hay barcos sin hundir
            }
        }
    }
    return true; // todos los barcos han sido hundidos
}

// hacer click en el tablero
function ataque(event) {
    if (finPartida) {
        return; // Comprueba si el juego ha acabado
    }

    const rect = canvas2.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / tamañoCelda);
    const y = Math.floor((event.clientY - rect.top) / tamañoCelda);

    if (tablero1[x][y].isHit) {
        return; // la celda ya ha sido golpeada anteriormente
    }

    tablero1[x][y].isHit = true; // marcar la celda como golpeada

    let moveResult = '';
    if (tablero1[x][y].hayBarco) {
        // mira si la celda que ha sido tocada tenia barco o no.
        if (comprovarFinalPartida(tablero1)) {
            finPartida = true;
            alert("¡Has ganado! Has hundido todos los barcos enemigos.");
        }
        moveResult = 'Hundido';
    } else { //Si no hay barco hay agua
        moveResult = 'Agua';
    }

    cambioLog.push(`Has disparado en : (${x}, ${y}) - ${moveResult}`); //Aqui se notifica en ekl log el movimiento.
    updateMovesLog();

    dibujarTabla(context1, tablero1);
}

// Disparo del enemigo al azar, basicamente la misma funciona de arriba cambiando los tableros
function disparoEnemigo() {
    const x = Math.floor(Math.random() * numCeldas);
    const y = Math.floor(Math.random() * numCeldas);

    if (tablero2[x][y].isHit) {
        disparoEnemigo(); // la celda ya ha sido golpeada anteriormente
    }

    tablero2[x][y].isHit = true; // Marcar la celda como golpeada

    let moveResult = '';
    if (tablero2[x][y].hayBarco) {
        // El barco enemigo ha sido golpeado
        if (comprovarFinalPartida(tablero2)) {
            finPartida = true;
            alert("¡Has perdido! Te han hundido todos los barcos.");
        }
        moveResult = 'Hundido';
    } else {
        moveResult = 'Agua';
    }

    cambioLog.push(`Disparo enemigo en : (${x}, ${y}) - ${moveResult}`);
    updateMovesLog();

    dibujarTabla(context2, tablero2);
}

// Cuando se haga click en el canvas del jugador, que el bot espere medio segundo para disparar.
canvas2.addEventListener('click', (event) => {
    setTimeout(disparoEnemigo, 500); // Llama a la funcion de dispara con un timeout
});

function resetGame() {
    // Reiniciar los tableros
    tablero1 = createEmptyBoard();
    tablero2 = createEmptyBoard();

    // Generar nuevos barcos aleatorios
    generarBarcosAleatorios(tablero1);
    generarBarcosAleatorios(tablero2);

    // Reiniciar variables de juego
    finPartida = false;
    cambioLog = [];

    // Actualizar el registro de movimientos
    updateMovesLog();

    // Dibujar los tableros iniciales
    dibujarTabla(context1, tablero1);
    dibujarTabla(context2, tablero2);
}

// Boton de reset
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame);


// funcion para actualizar el campo de texto del log
function updateMovesLog() {
    const movesLogField = document.getElementById('logMovimientos');
    movesLogField.value = cambioLog.join('\n');
}

// Llama a la funcion con cada tablero
generarBarcosAleatorios(tablero1);
generarBarcosAleatorios(tablero2);

// Dibujar los tableros iniciales
dibujarTabla(context1, tablero1);
dibujarTabla(context2, tablero2);

canvas2.addEventListener('click', ataque);
