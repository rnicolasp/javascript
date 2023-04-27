const tbody = document.querySelector("#tbody");
const btnCarrega = document.querySelector("#btnCarrega");
const act1 = document.querySelector("#act1");

btnCarrega.onclick = carregaXML;

function carregaXML() {
  fetch("../xml/pelicules.xml")
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "application/xml");
      exercici1(xml);
      exercici2(xml);
      exercici9(xml);
    })
    .catch(console.error);
}

function exercici1(xml) {
  var resultat = "";
  var pelicules = xml.querySelector("titulo");
  var titulo = pelicules.textContent;
  resultat += titulo;

  act1.innerHTML = resultat;
}

function exercici2(xml) {
  let actores = xml.querySelector("pelicula actores").querySelectorAll("actor");

  let resultat = "";
  actores.forEach(actor => {
    //resultat += actor.textContent + ";"
    resultat += `SEÑOR ${actor}`;
  });

}


function exercici9(xml) {

  let generos = xml.querySelectorAll("genero");

  let mapa = new Map();

  generos.forEach(element => {
    let genero = element.textContent;

    if (mapa.has(genero)) {
      let valor = mapa.get(genero);
      mapa.set(genero, valor + 1);
    } else {
      mapa.set(genero, 1);
    }
    mapa.set(genero, 1);
  });

  console.log(mapa)

  let generoResultado = "";
  let valorMaximo = 0;
  mapa.forEach((key, value) => {
    if (value > valorMaximo) {
      valorMaximo = value;
      generoResultado = key;
    }
  });

  document.querySelector("#ex9").textContent = `genero mas visto ${generoResultado} con ${valorMaximo} apariciones`;

}