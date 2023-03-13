const nom = document.querySelector("#nom");
const llin1 = document.querySelector("#llin1");
const btnCarrega = document.querySelector("#btnCarrega");

btnCarrega.onclick = carrega;

function carrega() {

    fetch("/json/dades.json")
        .then(response => {
            
           if (response.ok) return response.json();
           else {
            alert("No s'ha pogut completar la càrrega " + response.status);
           }

        })
        .then(data => {
                carregaDades(data);
        });
}

function carregaDades(dades){
    nom.value = dades.nom;
    llin1.value = dades.llin1;
}