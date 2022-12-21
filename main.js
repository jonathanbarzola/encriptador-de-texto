const btnEncriptar = document.querySelector(".btn-encriptar");
const btnDesencriptar = document.querySelector(".btn-desencriptar");
const btnCopiar = document.querySelector(".btn-copiar");

const textArea = document.querySelector("textarea");
const resultado = document.querySelector(".resultado");

const cardAviso = document.querySelector(".card-aviso");
const cardResultado = document.querySelector(".card-resultado");

btnCopiar.addEventListener("click", () => {
  const seleccion = document.getSelection();
  seleccion.selectAllChildren(resultado);
  document.execCommand("copy");

  toast("Texto Copiado ✅", "#385A36");
});

// Oculta la card donde se muestra el resultado
cardResultado.style.display = "none";

// Si el textarea tiene texto oculta el aviso de ingresar texto.
textArea.addEventListener("input", () => {
  if (!textArea.value == "" || !textArea.value == null) {
    // cardAviso.style.display = "none";
  } else {
    cardAviso.style.display = "block";
    cardResultado.style.display = "none";
  }

  // Convierte todo el texto en minúsculas
  textArea.value = textArea.value.toLowerCase();

  // Elimina acentos
  textArea.value = textArea.value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
});

const keys = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};

const reemplazos = {
  ai: "a",
  enter: "e",
  imes: "i",
  ober: "o",
  ufat: "u",
};

const encriptar = (string = "") => {
  const caracteres = string.split("");
  const caracteresReemplazados = caracteres.map((caracter) =>
    keys[caracter] ? (caracter = keys[caracter]) : caracter
  );

  return caracteresReemplazados.join("");
};

const desencriptar = (string = "") => {
  /*  
    - replace(valor-A-Encontrar, valor-A-Reemplazar)
    - Buscará las coincidencias dentro del string
    - Si encuentra una coincidencia la función se ejecutará y recibirá cómo argumento el valor encontrado.
    - La función busca en el "objeto reemplazos" SI existe ENTONCES retorna el valor reemplazado.
    - e.g gaitober = g-ai-t-ober encontró "ai" y "ober" y los reemplazará por su respectivo valor que sería "a" y "o";
  */

  /* 
    Una expresión regular o una cadena que se usa para buscar las ocurrencias que se quieren reemplazar. En este caso, se está pasando una expresión regular que busca cualquiera de las siguientes cadenas: "ai", "enter", "imes", "ober", "ufat". La bandera g (global) indica que se deben buscar todas las ocurrencias, no solo la primera.

    Una función que se invoca por cada ocurrencia encontrada y que devuelve el valor de reemplazo. La función recibe como argumento el valor que se ha encontrado y puede usarlo para calcular el valor de reemplazo.
  */
  return string.replace(
    /ai|enter|imes|ober|ufat/g,
    (match) => reemplazos[match]
  );
};

const haveAnimation = document.querySelector("#have-animation");

btnEncriptar.addEventListener("click", () => {
  if (textArea.value == "" || textArea.value == null) {

    toast("Ingresa un texto ❌", "#E71D36")
  } else {

    activeAnimation("lock");
  
    const textoEncriptado = encriptar(textArea.value);
    resultado.textContent = textoEncriptado;
    cardResultado.style.display = "block";
  
    cardAviso.style.display = "none";
    textArea.value = "";
  }

});

function activeAnimation(lock) {
  let pushed = `<img src="./assets/${lock}.svg" class="animation" alt="lock-unlock">`;
  haveAnimation.innerHTML = pushed;
}

btnDesencriptar.addEventListener("click", () => {
  if (textArea.value == "" || textArea.value == null) {

    toast("Ingresa un texto ❌", "#E71D36")
  } else {
    
    activeAnimation("unlock");
    const textoDesencriptado = desencriptar(textArea.value);
    resultado.textContent = textoDesencriptado;
    cardResultado.style.display = "block";
  
    cardAviso.style.display = "none";
    textArea.value = "";
  }

});



const toastAlert = document.querySelector("#toastAlert");

function toast(message, color) {
  toastAlert.style.opacity = "1";
  toastAlert.classList.add("activeAnimation");
  let pushed = `<p class="toastAlert" style="background-color: ${color};">${message}</p>`;
  toastAlert.innerHTML = pushed;
  setTimeout(() => {
    toastAlert.style.opacity = "0";
    toastAlert.classList.remove("activeAnimation");
  }, 3000);
}