const textarea = document.querySelector(".textarea");
const boton_e = document.querySelector(".btn_encriptar");
const boton_d = document.querySelector(".btn_desencriptar");
const workspace = document.querySelector(".flex_item_d");
const wscont1 = document.querySelector(".flex_item_d .item:first-child");
const wscont2 = document.querySelector(".flex_item_d .item:last-child");
const contenedor1 =  document.querySelector("#contenedor1");
const contenedor2 =  document.querySelector("#contenedor2");

function encriptar(textoNormalizado) {
    var textoEncriptado = "";
  
    if (textoNormalizado != null) {
        for (let i = 0; i < textoNormalizado.length; i++) {
            if (textoNormalizado.charAt(i) == "e") {
                textoEncriptado += "enter";
            } else if (textoNormalizado.charAt(i) == "i") {
                textoEncriptado += "imes";
            } else if (textoNormalizado.charAt(i) == "a") {
                textoEncriptado += "ai";
            } else if (textoNormalizado.charAt(i) == "o") {
                textoEncriptado += "ober";
            } else if (textoNormalizado.charAt(i) == "u") {
                textoEncriptado += "ufat";
            } else {
                textoEncriptado += textoNormalizado.charAt(i);
            }
        }
        return textoEncriptado;
    }
}

function desencriptar() {
  var texto = textarea.value;
  var textoDesencriptado = "";
  for (var i = 0; i < texto.length; i++) {
    if (texto.substring(i, i+5) == "enter") {
      textoDesencriptado += "e";
      i += 4;
    } else if (texto.substring(i, i+4) == "imes") {
      textoDesencriptado += "i";
      i += 3;
    } else if (texto.substring(i, i+2) == "ai") {
      textoDesencriptado += "a";
      i += 1;
    } else if (texto.substring(i, i+4) == "ober") {
      textoDesencriptado += "o";
      i += 3;
    } else if (texto.substring(i, i+4) == "ufat") {
      textoDesencriptado += "u";
      i += 3;
    } else {
      textoDesencriptado += texto.charAt(i);
    }
  }
  return textoDesencriptado;
}

function cambio(texto) {
  var nuevoTextarea = document.createElement("textarea");
  var copiarBoton = document.createElement("button");
  var divText = document.createElement("div");
  var divBoton = document.createElement("div");
  
  divText.setAttribute("id", "item_cont1");
  divBoton.setAttribute("id", "item_cont2");
  nuevoTextarea.setAttribute("id", "textareaout");
  copiarBoton.setAttribute("id", "btncopiar");

  copiarBoton.innerText = "Copiar";
  nuevoTextarea.value = texto;

  copiarBoton.addEventListener("click", function() {
    nuevoTextarea.select();
    document.execCommand("copy");
  });
  divText.appendChild(nuevoTextarea);
  divBoton.appendChild(copiarBoton);
  return [divText, divBoton];
}

function ajustarAltura(textarea) {
  const containerHeight = textarea.clientHeight;
  const scrollHeight = textarea.scrollHeight;
  if (scrollHeight > containerHeight * 0.9) {
    textarea.style.height = scrollHeight + 'px';
  } else {
    textarea.style.height = containerHeight + 'px';
  }
}

function validar(texto) {
  if (/[^a-z\n]/.test(texto)) {
    var opcion = confirm("El texto contiene caracteres especiales. ¿Desea limpiarlos?");
    if (opcion) {
      texto = texto.toLowerCase().replace(/[^a-z\n]/g, "");
      return texto;
    } else {
      return texto;
    }
    
  }
  
  return texto;
}

textarea.addEventListener('input', () => {
  const containerHeight = textarea.clientHeight;
  const scrollHeight = textarea.scrollHeight;
  if (scrollHeight > containerHeight * 0.9) {
    textarea.style.height = scrollHeight + 'px';
  } else {
    textarea.style.height = containerHeight + 'px';
  }
});

boton_e.addEventListener("click", function() {
  let texto = textarea.value;
  const salida = document.querySelector("#textareaout");
  if(texto!=""){
    let textoNormalizado = validar(texto);
    if(wscont1.contains(contenedor1)){
      let textoEncriptado = encriptar(textoNormalizado);
      let elemento = cambio(textoEncriptado);
      wscont1.replaceChild(elemento[0], contenedor1);
      wscont2.replaceChild(elemento[1], contenedor2);
      ajustarAltura(elemento[0].childNodes[0]);
    }
    else if(wscont1.contains(textareaout)) {
      let textoEncriptado = encriptar(textoNormalizado);
       salida.value = textoEncriptado;
      ajustarAltura(textareaout);
    }
  }
});

boton_d.addEventListener("click", function() {
  let texto = textarea.value;
  const salida = document.querySelector("#textareaout");
  let textoNormalizado = validar(texto);
  if(wscont1.contains(contenedor1)){
    let textoEncriptado = desencriptar(textoNormalizado);
    let elemento = cambio(textoEncriptado);
    wscont1.replaceChild(elemento[0], contenedor1);
    wscont2.replaceChild(elemento[1], contenedor2);
    ajustarAltura(elemento[0].childNodes[0]);
  }
    else if(wscont1.contains(textareaout)) {
      
      let textoEncriptado = desencriptar(textarea.value);
      salida.value = textoEncriptado;
      ajustarAltura(textareaout);
    }
});