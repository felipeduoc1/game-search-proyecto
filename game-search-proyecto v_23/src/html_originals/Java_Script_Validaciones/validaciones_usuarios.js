const formulario = document.querySelector(".formulario");
const inputs = document.querySelectorAll(".formulario input, .formulario select");

// Expresiones regulares
const expresiones = {
    run: /^[0-9]{7,8}[0-9kK]{1}$/, // 7 u 8 números + dígito o K
    nombre: /^.{1,50}$/,            // 1 a 50 caracteres
    correo: /^[^\s@]+@(duocuc\.cl|profesor\.duoc\.cl|gmail\.com)$/, // dominios permitidos
    telefono: /^\d{7,15}$/          // opcional, 7-15 dígitos
};

// Estado de campos
const campos = {
    run: false,
    nombre: false,
    correo: false,
    telefono: true,
    tipoUsuario: false,
    region: false,
    comuna: false,
    password: false,
    confirmar: false
};

// Regiones y comunas
const regiones = {
    "Región Metropolitana de Santiago": ["Santiago", "Las Condes", "Ñuñoa"],
    "Región de Los Ángeles": ["Los Ángeles", "Mulchén", "Nacimientos"],
    "Región de Ñuble": ["Linares", "Chillán", "Bulnes"]
};

// Marcar borde
const marcarBorde = (input, valido) => {
    input.style.border = valido ? "2px solid green" : "2px solid red";
}

// Validar campo
const validarCampo = (expresion, input, campo) => {
    const error = document.getElementById(`error-${campo}`);
    if(expresion.test(input.value)){
        campos[campo] = true;
        error && (error.textContent = "");
        marcarBorde(input,true);
    } else {
        campos[campo] = false;
        if(error){
            switch(campo){
                case "run": error.textContent="RUN inválido (sin puntos ni guion, 7-9 caracteres)"; break;
                case "nombre": error.textContent="Nombre requerido (máx 50 caracteres)"; break;
                case "correo": error.textContent="Correo inválido (@duocuc.cl, @profesor.duoc.cl, @gmail.com)"; break;
                case "telefono": error.textContent="Teléfono inválido (7-15 dígitos)"; break;
                case "password": error.textContent="Contraseña debe tener 6-20 caracteres"; break;
            }
        }
        marcarBorde(input,false);
    }
}

// Validar confirmación de contraseña
const validarConfirmar = () => {
    const password = document.getElementById("password");
    const confirmar = document.getElementById("confirmar");
    const error = document.getElementById("error-confirmar");
    if(password.value !== "" && password.value === confirmar.value){
        campos.confirmar = true;
        error && (error.textContent = "");
        marcarBorde(confirmar,true);
    } else {
        campos.confirmar = false;
        error && (error.textContent = "Las contraseñas no coinciden");
        marcarBorde(confirmar,false);
    }
}

// Validar select
const validarSelect = (select, campo) => {
    const error = document.getElementById(`error-${campo}`);
    if(select.value !== ""){
        campos[campo]=true;
        error && (error.textContent="");
        select.style.border="2px solid green";
    } else {
        campos[campo]=false;
        error && (error.textContent="Debe seleccionar una opción");
        select.style.border="2px solid red";
    }
}

// Eventos inputs y selects
inputs.forEach(input=>{
    input.addEventListener("keyup",(e)=>{
        switch(e.target.id){
            case "run": validarCampo(expresiones.run,e.target,"run"); break;
            case "nombre": validarCampo(expresiones.nombre,e.target,"nombre"); break;
            case "correo": validarCampo(expresiones.correo,e.target,"correo"); break;
            case "telefono":
                if(e.target.value.length>0) validarCampo(expresiones.telefono,e.target,"telefono");
                else { campos.telefono=true; e.target.style.border=""; }
                break;
            case "password": validarCampo(/^.{6,20}$/,e.target,"password"); validarConfirmar(); break;
            case "confirmar": validarConfirmar(); break;
        }
    });
    input.addEventListener("blur",(e)=>{
        switch(e.target.id){
            case "run": validarCampo(expresiones.run,e.target,"run"); break;
            case "nombre": validarCampo(expresiones.nombre,e.target,"nombre"); break;
            case "correo": validarCampo(expresiones.correo,e.target,"correo"); break;
            case "telefono":
                if(e.target.value.length>0) validarCampo(expresiones.telefono,e.target,"telefono");
                else { campos.telefono=true; e.target.style.border=""; }
                break;
            case "password": validarCampo(/^.{6,20}$/,e.target,"password"); validarConfirmar(); break;
            case "confirmar": validarConfirmar(); break;
        }
    });

    if(input.tagName==="SELECT"){
        input.addEventListener("change",(e)=>{
            if(e.target.name==="region"){
                const region=e.target.value;
                const selectComuna=document.querySelector("select[name='comuna']");
                selectComuna.innerHTML="<option value=''>-- Seleccione la comuna --</option>";
                if(regiones[region]){
                    regiones[region].forEach(c=>{
                        const option=document.createElement("option");
                        option.value=c;
                        option.textContent=c;
                        selectComuna.appendChild(option);
                    });
                }
                validarSelect(e.target,"region");
            } else if(e.target.name==="comuna") validarSelect(e.target,"comuna");
            else if(e.target.id==="rol") validarSelect(e.target,"tipoUsuario");
        });
    }
});

// Enviar formulario
formulario.addEventListener("submit",(e)=>{
    e.preventDefault();
    validarSelect(document.getElementById("rol"),"tipoUsuario");
    validarSelect(document.querySelector("select[name='region']"),"region");
    validarSelect(document.querySelector("select[name='comuna']"),"comuna");

    const todoValido=Object.values(campos).every(v=>v===true);
    if(todoValido){
        alert("✅ Usuario registrado correctamente");
        formulario.reset();
        inputs.forEach(input=>input.style.border="");
        Object.keys(campos).forEach(c=>campos[c]=c==="telefono"?true:false);
    } else {
        alert("⚠️ Por favor complete correctamente todos los campos");
    }
});
