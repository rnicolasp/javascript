const form = document.querySelector('form');
const nom = document.querySelector("#nom");
const llin1 = document.querySelector("#llin1");
const llin2 = document.querySelector("#llin2");
const usuari = document.querySelector("#usuari");
const password = document.querySelector("#password");
const pais = document.querySelector("#pais");
const cp = document.querySelector("#cp");
const dni = document.querySelector("#dni");
const captcha = document.querySelector("#captcha");
const label_captcha = document.querySelector("#label-captcha")

const usuaris = ["daniel82", "manuel223", "darknight1", "mrNum.1234"];

form.onsubmit = function (event) {
    form.querySelectorAll("input").forEach(element => {
        element.dispatchEvent(new Event("input"));
    });

    setValidity(captcha, validaCaptcha());

    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        alert("Revisau les errades abans de continuar");
    }

    form.classList.add('was-validated');
};

/* Attach events oninput*/
nom.oninput = function () {
    setValidity(this, validaLlargaria(this.value, 2, 24) + nomesLletres(this.value));
};

llin1.oninput = function () {
    setValidity(this, validaLlargariaLlin1(this.value, 2, 24) + nomesLletres(this.value));
};

llin2.oninput = function () {
    setValidity(this, validaLlargariaLlin2(this.value, 2, 24) + nomesLletres(this.value));
};

usuari.oninput = function () {
    setValidity(this, validaLlargariaUsuari(this.value, 6, 16) + validaNomUsuari(this.value));
};

password.oninput = function () {
    setValidity(this, validaLlargariaPassword(this.value, 8, 16) + validaPasswordStrength(this.value));
};

cp.oninput = function () {
    setValidity(this, validaLlargariaCP(this.value) + validaNumCP(this.value));
};

pais.oninput = function () {
    opcioSelect(this);
}

dni.oninput = function () {
    setValidity(this, validarDni(this.value));
}
 



/* Funció que marca els inputs com a vàlids/invàlids*/
function setValidity(element, msgError) {
    element.classList.remove("is-invalid");
    element.classList.remove("is-valid");

    if (msgError.length == 0) {
        element.classList.add("is-valid");
    } else {
        element.classList.add("is-invalid");
    }

    element.setCustomValidity(msgError);
    document.querySelector(`#error-${element.id}`).textContent = msgError;
}


/* CAPTCHA */
var generaCaptcha = function () {
    var a = Math.round(Math.random() * 10);
    var b = Math.round(Math.random() * 10);

    var operacio = (b * a % 2 == 0) ? "+" : "-"

    label_captcha.textContent = a + "" + operacio + "" + b;

    return operacio == "+" ? a + b : a - b;

}();

function validaCaptcha() {
    var x = eval(label_captcha.textContent);
    var y = captcha.value;

    return (x == y) ? "" : "No es";
}

function validaLlargaria(input, min, max) {
    return (input.length > min && input.length < max) ? "" : `La mida ha de estar entre ${min} i ${max}.`;
}

function validaLlargariaLlin1(input, min, max) {
    return (input.length > min && input.length < max) ? "" : `La mida ha de estar entre ${min} i ${max}.`;
}

function validaLlargariaLlin2(input, min, max) {
    return (input.length > min && input.length < max) ? "" : `La mida ha de estar entre ${min} i ${max}.`;
}

function validaLlargariaUsuari(input, min, max) {
    return (input.length > min && input.length < max) ? "" : `La mida ha de estar entre ${min} i ${max}.`;
}

function validaLlargariaPassword(input, min, max) {
    return (input.length > min && input.length < max) ? "" : `La mida ha de estar entre ${min} i ${max}.`;
}

function validaNomUsuari(input) {
    for (let i = 0; i < usuaris.length - 1; i++) {
        if (usuaris[i - 1] == (input)) {
            return "Usuari agafat";
        }
    }
    return "";
}

function validaLlargariaCP(input) {
    return (input.length == 5) ? "" : `La mida ha de ser 5.`;
}

function validaPasswordStrength(input) {
    var regExp = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;

    return regExp.test(input) ? "" : " Ha de contenir minúscula, majúscula, nombre i simbol";
}

function opcioSelect() {
    if (pais.value != 3) {
        document.getElementById("cp").setAttribute("disabled","");
        document.getElementById("dni").setAttribute("disabled","");
    } else {
        document.getElementById("cp").removeAttribute("disabled","");
        document.getElementById("dni").removeAttribute("disabled","");
    }
}

function nomesLletres(input) {
    var regExp = /^[a-zA-Z\s]*$/;

    return regExp.test(input.toUpperCase()) ? "" : " Només es permeten lletres";
}

function nomesNums() {
    return /^[0-9]*$/.test.input ? "" : " Només es permeten números";
}

function validaNumCP(input) {
    var regExp = /^[0-9]*$/;

    return regExp.test(input) ? "" : " Només es poden escriure nombres.";
}

function validarDni(dni) {
    var numero
    var letr
    var letra
    var expresion_regular_dni
   
    expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
   
    if(expresion_regular_dni.test (dni) == true){
       numero = dni.substr(0,dni.length-1);
       letr = dni.substr(dni.length-1,1);
       numero = numero % 23;
       letra='TRWAGMYFPDXBNJZSQVHLCKET';
       letra=letra.substring(numero,numero+1);
      if (letra!=letr.toUpperCase()) {
         return ('Dni erroneo, la letra del NIF no se corresponde');
       }else{
         return "";
       }
    }else{
       return 'Dni erroneo, formato no válido';
     }
  }