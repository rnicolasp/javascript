//inicialització
function init(){
    document.getElementById("calculaFact").addEventListener("click", function(){executaFuncio(calculaFactorial, "resFact", "numFact")});
    document.getElementById("calculaSenar").addEventListener("click", function(){executaFuncio(esImparell, "resSenar", "numSenar")});
    document.getElementById("calculaPot").addEventListener("click", function(){executaFuncio(potencia, "resPot", "numPot1", "numPot2")});
}

//funcions d'ajuda
function obteNum(id){ //aquesta funció retorna un núm o NaN
    if (id === undefined) return NaN;
    return parseInt(document.getElementById(id).value);
}

function executaFuncio(funcioCalcul, output, input1, input2){
    var num1=obteNum(input1);
    var num2=obteNum(input2);

    var resultat = "";
    if (input1!==undefined && isNaN(num1) || input2!==undefined && isNaN(num2) ){
        resultat = "Error!";
    } else{
        resultat = funcioCalcul(num1, num2);
    }

    document.getElementById(output).value = resultat;
}
//fi funcions ajuda

//funcions que heu d'implementar
function calculaFactorial(numero){
    return 0;
}

function esImparell(numero){
    return "Sí";
}

function potencia(numero1, numero2){
    return 0;
}

