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
});

// Oculta la card donde se muestra el resultado
cardResultado.style.display = "none";

// Si el textarea tiene texto oculta el aviso de ingresar texto.
textArea.addEventListener("input", () => {
  if (!textArea.value == "" || !textArea.value == null) {
    cardAviso.style.display = "none";
  } else {
    cardAviso.style.display = "block";
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

const encriptar = (string = "") => {
  const caracteres = string.split("");
  const caracteresReemplazados = caracteres.map((caracter) =>
    keys[caracter] ? (caracter = keys[caracter]) : caracter
  );

  return caracteresReemplazados.join("");
};

const desencriptar = (string = "") => {
  return string
    .replaceAll("ai", "a")
    .replaceAll("enter", "e")
    .replaceAll("imes", "i")
    .replaceAll("ober", "o")
    .replaceAll("ufat", "u");
};

btnEncriptar.addEventListener("click", () => {
  if (textArea.value == "" || textArea.value == null) return;

  const textoEncriptado = encriptar(textArea.value);
  resultado.textContent = textoEncriptado;
  cardResultado.style.display = "block";
});

btnDesencriptar.addEventListener("click", () => {
  if (textArea.value == "" || textArea.value == null) return;

  const textoDesencriptado = desencriptar(textArea.value);
  resultado.textContent = textoDesencriptado;
  cardResultado.style.display = "block";
});
