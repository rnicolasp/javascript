const selectRover = document.querySelector("#rover");
const selectCameras = document.querySelector("#cameras");
const selectPagines = document.querySelector("#pagina");
const divResultat = document.querySelector("#resultat");
const btnCarrega = document.querySelector("#btnCarrega");
const divLoading = document.querySelector("#loading");
const fecha = document.querySelector("#data");
const camerasCuriosity = ['FHAZ', 'RHAZ', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI', 'NAVCAM'];
const camerasOpportunitySpirit = ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'];

btnCarrega.onclick = carrega;
selectRover.oninput = carregaCameras;

function carregaCameras() {
    var arrayARecorrer = []
    if (selectRover.ariaValueMax.toLowerCase() == "Curiosity".toLowerCase) {
        arrayARecorrer = camerasCuriosity;
    } else {
        arrayARecorrer = camerasOpportunitySpirit;
    }

    var resultat = "<option value=''>Selecciona</option>";
    arrayARecorrer.forEach(function (element) {
        resultat += `<option value="${element}">${element}</option>`
    });

    selectCameras.innerHTML = resultat;
}

carregaCameras();

function carrega() {



    var roverSeleccionat = selectRover.value;
    var URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverSeleccionat}/photos?&api_key=a20QuAMHhKUFO8KrqnV4JNzrlpd9igSpOjWSzvmy`;

    if (selectCameras.value) {
        URL += `&camera=${selectCameras.value}`;
    }

    URL += `&page=${selectPagines.value}`;

    if (fecha.value) {
        URL += `&earth_date=${fecha.value}`;
        console.log(URL);
    }

    fetch(URL)
        .then(response => {

            if (response.ok) return response.json();
            else {
                alert("No s'ha pogut completar la càrrega " + response.status);
            }

        })
        .then(data => {
            carregaDades(data);
        });

    console.log(URL);
}

function carregaDades(data) {

    let resultat = "";

    if (data.photos.length) {

        data.photos.forEach((element, index) => {

            let earth_date = element.earth_date;
            let dataArray = earth_date.split("-");
            let novaData = `${dataArray[2]}/${dataArray[1]}/${dataArray[0]}`;
            resultat += `<div class="col-6 col-sm-3"><p>
            <label>Imatge amb id ${element.id} de dia ${novaData}. Rover name: ${element.rover.name} </label>
            <img class="img-fluid" src='${element.img_src}'></img>
            </p></div>`
        })
    } else {
        resultat = "No s'han trobat dades";
    }
    divResultat.innerHTML = resultat;

}