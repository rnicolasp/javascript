const btnCarrega = document.querySelector("#btnCarrega");
const act1 = document.querySelector("#act1");
const act2 = document.querySelector("#act2");
const act3 = document.querySelector("#act3");
const act4 = document.querySelector("#act4");
const act5 = document.querySelector("#act5");
const act6 = document.querySelector("#act6");
const act7 = document.querySelector("#act7");
const act8 = document.querySelector("#act");
const act9 = document.querySelector("#act9");
const act10 = document.querySelector("#act10");

btnCarrega.onclick = carregaXML;

function carregaXML() {
  fetch("../xml/pelicules.xml")
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, "application/xml");
      exercici1(xml);
      exercici2(xml);
      exercici3(xml);
      exercici4(xml);
      exercici5(xml);
      exercici6(xml);
      exercici7(xml);
      exercici8(xml);
      exercici9(xml);
      exercici10(xml);
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
  let resultat = "";
  const peliculas = xml.getElementsByTagName('pelicula');
  for (let i = 0; i < peliculas.length; i++) {
    const anio = peliculas[i].getElementsByTagName('anio')[0].textContent;
    if (anio >= 2001) {
      const titulo = peliculas[i].getElementsByTagName('titulo')[0].textContent;
      resultat += (`<li>${titulo}</li>`);
    }
  }
  act2.innerHTML = resultat;
}

function exercici3(xml) {
  var peliculasBluRay = xml.querySelectorAll('titulo[formato="Blu-ray"]');
  var resultat = "";

  for (var i = 0; i < peliculasBluRay.length; i++) {
    var pelis = peliculasBluRay[i].textContent;
    resultat += (`<li>${pelis}</li>`);
  }

  act3.innerHTML = resultat;
}


function exercici4(xml) {
  var peliculas = xml.getElementsByTagName("pelicula");
  var resultado = "";

  for (var i = 0; i < peliculas.length; i++) {
    var anio = peliculas[i].getElementsByTagName("anio")[0].textContent;
    var formato = peliculas[i].querySelectorAll("titulo[formato='DVD']");

    if (anio > 2000 && formato.length > 0) {
      resultado += "<li>" + peliculas[i].getElementsByTagName("titulo")[0].textContent + "</li>";
    }
  }

  act4.innerHTML = resultado;
}

function exercici5(xml) {

}


function exercici6(xml) {
  const pelicules = xml.getElementsByTagName('pelicula');
  let sinopsi = '';
  for (let i = 0; i < pelicules.length; i++) {
    const titol = pelicules[i].getElementsByTagName('titulo')[0];
    if (titol.textContent === 'Forrest Gump') {
      sinopsi = pelicules[i].getElementsByTagName('sinopsis')[0].textContent;
      break;
    }
  }

  // Imprimir la sinopsi
  act6.innerHTML = sinopsi;
}


function exercici7(xml) {
  const titulos = xml.getElementsByTagName('titulo');
  const generos = xml.getElementsByTagName('genero');

  const titulosDrama = [];
  var resultado = "";
  for (let i = 0; i < titulos.length; i++) {
    for (let j = 0; j < generos.length; j++) {
      if (generos[j].textContent === 'Drama' && generos[j].parentNode === titulos[i].parentNode.getElementsByTagName('generos')[0]) {
        titulosDrama.push(titulos[i]);
        break;
      }
    }
  }

  for (let i = 0; i < titulosDrama.length; i++) {
    resultado += "<li>" + titulosDrama[i].textContent + "</li>";
  }

  act7.innerHTML = resultado;
}

function exercici8(xml) {
}

function exercici9(xml) {
  const generes = xml.getElementsByTagName('genero');
  const generesCount = {};
  for (let i = 0; i < generes.length; i++) {
    const nomGenere = generes[i].textContent;
    generesCount[nomGenere] = (generesCount[nomGenere] || 0) + 1;
  }

  let genereMesFreq = '';
  let maxCount = 0;
  for (const nomGenere in generesCount) {
    if (generesCount[nomGenere] > maxCount) {
      genereMesFreq = nomGenere;
      maxCount = generesCount[nomGenere];
    }
  }

  act9.innerHTML = genereMesFreq;
}
function exercici10(xml) {
  const pelicules = xml.getElementsByTagName('pelicula');
  const peliculesTomHanks = [];
  for (let i = 0; i < pelicules.length; i++) {
    const actors = pelicules[i].getElementsByTagName('actor');
    for (let j = 0; j < actors.length; j++) {
      if (actors[j].textContent === 'Tom Hanks') {
        peliculesTomHanks.push(pelicules[i].getElementsByTagName('titulo')[0].textContent);
        break;
      }
    }
  }

  act10.innerHTML = peliculesTomHanks;
}