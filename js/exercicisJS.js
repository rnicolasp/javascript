//inicialització
function init() {
    document.getElementById("calculaFact").addEventListener("click", function () { executaFuncio(calculaFactorial, "resFact", "numFact") });
    document.getElementById("calculaSenar").addEventListener("click", function () { executaFuncio(esImparell, "resSenar", "numSenar") });
    document.getElementById("calculaPot").addEventListener("click", function () { executaFuncio(potencia, "resPot", "numPot1", "numPot2") });
    document.getElementById("calculaRaiz").addEventListener("click", function () { executaFuncio(raiz, "resRaiz", "numRaiz") });
    document.getElementById("calculaRandom").addEventListener("click", function () { executaFuncio(random, "resRandom") });
    document.getElementById("fonsAleatori").addEventListener("click", function () { executaFuncio(fonsAleatori, "fonsAleatori") });
}

//funcions d'ajuda
function obteNum(id) { //aquesta funció retorna un núm o NaN
    if (id === undefined) return NaN;
    return parseInt(document.getElementById(id).value);
}

function executaFuncio(funcioCalcul, output, input1, input2) {
    var num1 = obteNum(input1);
    var num2 = obteNum(input2);

    var resultat = "";
    if (input1 !== undefined && isNaN(num1) || input2 !== undefined && isNaN(num2)) {
        resultat = "Error!";
    } else {
        resultat = funcioCalcul(num1, num2);
    }

    document.getElementById(output).value = resultat;
}
//fi funcions ajuda

//funcions que heu d'implementar
function calculaFactorial(numero) {

    if (numero < 0) return ">w<"
    else if (numero == 0) return 1;
    else {
        let resultat = 1;
        for (let i = 1; i <= numero; i++) {
            resultat *= i;
        }
        return resultat;
    }
}

function esImparell(numero) {
    return (numero % 2 != 0) ? "Sí" : "No";
}

function potencia(numero1, numero2) {
    return numero1 ** numero2;
}

function raiz(numero) {

    var resultat = Math.sqrt(numero);

    if (parseInt(resultat) != resultat) resultat = resultat.toFixed(2);

    return resultat;
}

function random() {
    return Math.round(Math.random() * 100);
}

var estudioEstadistico = function() {
    const limit = 10000;
    var suma = 0;
    for (let i = 0; i < 10000; i++) {
        
        let rand = random();
        suma += rand;

        if (rand == 100) {
            console.log("LO HE ENCONTRADO!!11 !>W< !!!1!1 en la iteración " + i);
        }
    }

    console.log(suma/limit);

}();

function fonsAleatori(){
    document.body.style.backgroundColor = `rgb(${random()},${random()},${random()}`;
}
