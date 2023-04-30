const tbody = document.querySelector("#tbody");
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
  var peliculasDVD = xml.querySelectorAll(`pelicula[anio>'2000'] titulo[formato='DVD']`);
  var resultado = "";
  
  for (var i = 0; i < peliculasDVD.length; i++) {
    resultado += "<li>" + peliculasDVD[i].textContent + "</li>";
  }
  
  act4.innerHTML = resultado;
}

function exercici5(xml) {

}
function exercici6(xml) {

}
function exercici7(xml) {

}
function exercici8(xml) {

}
function exercici9(xml) {

}
function exercici10(xml) {

}