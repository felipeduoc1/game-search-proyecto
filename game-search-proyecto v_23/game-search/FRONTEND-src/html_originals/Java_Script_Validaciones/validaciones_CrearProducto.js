// Selección de formulario e inputs
const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

// Expresiones regulares
const expresiones = {
    nombre: /^[a-zA-Z0-9\s\-\_]{4,40}$/,    // letras, números, espacios, guiones
    categoria: /^[a-zA-Z0-9À-ÿ\s]{3,40}$/,  // letras, números, acentos, espacios
    precio: /^\d+(\.\d{1,2})?$/,            // número con 2 decimales opcionales
    stock: /^\d{1,14}$/                      // hasta 14 dígitos
}

// Estado de campos
const campos = {
    nombre: false,
    categoria: false,
    precio: false,
    stock: false
}

// Función para marcar borde
const marcarBorde = (input, valido) => {
    input.style.border = valido ? "2px solid green" : "2px solid red";
}

// Validar un campo
const validarCampo = (expresion, input, campo) => {
    const error = document.getElementById(`error-${campo}`);
    let valido = expresion.test(input.value);

    // Chequear que no sea negativo para precio y stock
    if (valido) {
        if ((campo === "precio" && parseFloat(input.value) < 0) ||
            (campo === "stock" && parseInt(input.value, 10) < 0)) {
            valido = false;
            error.textContent = "⚠️ No se permiten números negativos";
        } else {
            error.textContent = "";
        }
    } else {
        switch(campo){
            case "nombre":
                error.textContent = "El nombre debe tener entre 4 y 40 caracteres.";
                break;
            case "categoria":
                error.textContent = "La categoría debe tener letras, números y espacios (3-40 caracteres).";
                break;
            case "precio":
                error.textContent = "Ingrese un precio válido (ej: 199.99) y no negativo.";
                break;
            case "stock":
                error.textContent = "El stock debe ser un número válido y no negativo.";
                break;
        }
    }

    campos[campo] = valido;
    marcarBorde(input, valido);
}

// Detectar input y validar en tiempo real
inputs.forEach(input => {
    input.addEventListener('keyup', (e) => validarFormulario(e));
    input.addEventListener('blur', (e) => validarFormulario(e));
});

const validarFormulario = (e) => {
    switch(e.target.id){
        case "nombre":
            validarCampo(expresiones.nombre, e.target, "nombre");
            break;
        case "categoria":
            validarCampo(expresiones.categoria, e.target, "categoria");
            break;
        case "precio":
            validarCampo(expresiones.precio, e.target, "precio");
            break;
        case "stock":
            validarCampo(expresiones.stock, e.target, "stock");
            break;
    }
}

// Validación al enviar el formulario
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    if(campos.nombre && campos.categoria && campos.precio && campos.stock){
        alert("✅ Producto guardado correctamente");
        formulario.reset();
        inputs.forEach(input => input.style.border = ""); // reset de bordes
        Object.keys(campos).forEach(campo => campos[campo] = false);
    } else {
        alert("⚠️ Por favor completa correctamente todos los campos.");
    }
});
