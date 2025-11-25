// Selección de formulario e inputs
const formulario = document.querySelector(".formulario");
const inputs = document.querySelectorAll(".formulario input");

// Expresiones regulares
const expresiones = {
    nombre: /^[a-zA-Z0-9\s\-\_áéíóúÁÉÍÓÚüÜ]{4,40}$/,  // letras, números, espacios, guiones y acentos
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/   // correo válido
}

// Estado de campos
const campos = {
    nombre: false,
    email: false
}

// Función para marcar borde
const marcarBorde = (input, valido) => {
    input.style.border = valido ? "2px solid green" : "2px solid red";
}

// Validar un campo
const validarCampo = (expresion, input, campo) => {
    const error = document.getElementById(`error-${campo}`);
    if(expresion.test(input.value)){
        error && (error.textContent = "");
        campos[campo] = true;
        marcarBorde(input, true);
    } else {
        switch(campo){
            case "nombre":
                error.textContent = "El nombre debe tener entre 4 y 40 caracteres.";
                break;
            case "email":
                error.textContent = "Correo electrónico inválido.";
                break;
        }
        campos[campo] = false;
        marcarBorde(input, false);
    }
}

// Eventos de inputs
inputs.forEach(input => {
    input.addEventListener('keyup', (e) => {
        switch(e.target.id){
            case "nombre":
                validarCampo(expresiones.nombre, e.target, "nombre");
                break;
            case "email":
                validarCampo(expresiones.email, e.target, "email");
                break;
        }
    });

    input.addEventListener('blur', (e) => {
        switch(e.target.id){
            case "nombre":
                validarCampo(expresiones.nombre, e.target, "nombre");
                break;
            case "email":
                validarCampo(expresiones.email, e.target, "email");
                break;
        }
    });
});

// Validación al enviar el formulario
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    if(campos.nombre ||  campos.email){
        alert("✅ Usuario actualizado correctamente");
        formulario.reset();
        inputs.forEach(input => input.style.border = "");
        Object.keys(campos).forEach(campo => campos[campo] = false);
    } else {
        alert("⚠️ Por favor completa correctamente todos los campos.");
    }
});
