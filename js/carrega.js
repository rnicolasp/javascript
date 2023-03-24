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

carregaCameras();

function carregaCameras() {
    var arrayARecorrer = []
    if (selectRover.value == "curiosity") {
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


function carrega() {

    var roverSeleccionat = selectRover.value;
    var paginaSelected = selectPagines.value;
    var cameraSelected = selectCameras.value;

    var URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverSeleccionat}/photos?&api_key=a20QuAMHhKUFO8KrqnV4JNzrlpd9igSpOjWSzvmy&page=${paginaSelected}`;

    if (fecha.value) {
        URL += `&earth_date=${fecha.value}`;
    }

    if (cameras.value) {
        URL += `&camera=${cameraSelected}`;
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
            resultat += `<div class="card" style = "width: 18rem;">
                            <a href="${element.img_src}" target="_blank"><img src = "${element.img_src}" class=" mt-2 card-img-top" alt = "..." ></a>
                            <div class="card-body">
                                <h5 class="card-title">${element.rover.name}</h5>
                                <p class="card-text">Imatge ${element.id}.</p>
                                <p>Dia ${novaData}.</p>
                                <p class="card-text">Càmara ${element.camera.name}</p>
                             </div>
                        </div>`
        })
    } else {
        resultat = "No s'han trobat dades";
    }
    divResultat.innerHTML = resultat;

}