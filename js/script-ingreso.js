//Acordeon
let hosts3 = 'https://clinicaduoc.s3.amazonaws.com';
let hostgateway = 'https://i0ottrtiwa.execute-api.us-east-1.amazonaws.com';
let estados = {
    "recepcionado": "RECEPCIONADO",
    "enproceso": "EN PROCESO",
    "finalizado": "FINALIZADO"
};

document.querySelectorAll('.toggle-bar').forEach(function(toggleBar) {
    toggleBar.addEventListener('click', function() {
        var content = this.nextElementSibling;
        var icon = this.querySelector('.toggle-icon');
        if (content.style.display === 'none' || content.style.display === '') {
            content.style.display = 'block';
            icon.textContent = '-';
        } else {
            content.style.display = 'none';
            icon.textContent = '+';
        }
    });
});

/*Validacion CheckBox's*/
document.addEventListener('DOMContentLoaded', (event) => {
    
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', (event) => {
            const name = event.target.name;
            const checked = event.target.checked;
            
            checkboxes.forEach((cb) => {
                if (cb.name === name && cb !== event.target) {
                    cb.checked = false;
                }
            });
        });
    });
});

const UUID = () => {
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    bytes[6] = (bytes[6] & 0x0f) | 0x40; 
    bytes[8] = (bytes[8] & 0x3f) | 0x80; 
    const uuid = Array.from(bytes).map((b) => {
        const hex = b.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('').replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, '$1-$2-$3-$4-$5');
    return uuid;
};

const createdAt = () => {
    const fecha = new Date().toISOString();
    return fecha;
};

const user = () => {
    return {
        nombre: document.getElementById('inputNombre').value,
        email: document.getElementById('inputEmail').value,
        rut: document.getElementById('inputRut').value,
        telefono: document.getElementById('inputTelefono').value
    };
};

const select = (idSelect) => {
    const selector = document.getElementById(idSelect);
    return selector.options[selector.selectedIndex].text;
};

const checkbox = (claseCheckbox) => {
    let checkboxes = document.querySelectorAll(`.${claseCheckbox}`);
    let check = "";
    checkboxes.forEach((elemento) => {
        if(elemento.checked){
            check = elemento.getAttribute('value');
        }
    });
    return check;
};

const obtieneDatosDeSesion = () => {
    const datos = sessionStorage.getItem('datos');
    if (datos) {
        return JSON.parse(datos);
    }
    return null;

}

const infoEquipo = () => {
    return {
        marca: document.getElementById('inputMarca').value,
        modelo: document.getElementById('inputModelo').value,
        serie: document.getElementById('inputSerie').value,
        observacion: document.getElementById('inputObservaciones').value,
        ram: document.getElementById('inputRam').value,
        procesador: document.getElementById('inputProcesador').value,
        tiempoReparacion: document.getElementById('inputMinutes').value,
        adicional: document.getElementById('inputObservaciones').value,
        selectEquipo: select("tipoEquipo"),
        selectSistema: select("inputSistema"),
        garantia: checkbox("garantiaCheck"),
        cargador: checkbox("cargadorCheck"),
        almacenamiento: checkbox("almacenamientoCheck")
    }
};

document.getElementById('guardar').addEventListener('click', () => {

    const id = UUID();
    const fechaCreacion = createdAt();
    const usuario = user();
    const datosEquipo = infoEquipo();
    const datosSesion = obtieneDatosDeSesion();

    const idformulario = crypto.randomUUID();
    /**
     *     return {nombre, email, rut, telefono};
     */
    const _body ={
        "id": idformulario,
        "datosFicha": {
         "datosEquipo": {
          "almacenamiento": datosEquipo.almacenamiento,
          "gpu": datosEquipo.gpu,
          "procesador": datosEquipo.procesador,
          "ram": datosEquipo.ram,
          "sistemaOperativo": datosEquipo.selectSistema,
          "tipoAlmacenamiento": datosEquipo.selectEquipo,
          "cargador": datosEquipo.cargador,
          "garantia": datosEquipo.garantia,
         },
         "usuario": {
          "apellido": usuario.nombre,
          "email": usuario.email,
          "nombre": usuario.nombre,
         },
         "usuarioRecepcionista": {
          "apellido": datosSesion.apellido,
          "email": datosSesion.email,
          "nombre": datosSesion.nombre,
         },
         "tecnicoEncargado":{
           "nombre":null,
           "apellido":null,
           "email":null
         }
        },
        
        "estado": estados.recepcionado,
        "fechaCreacion": createdAt()
    }
    
    //TODO obtener los datos desde la sesión
    const usuarioRecepcionista = {
            "nombre": "Juan",
            "apellido": "Perez",
            "email": "juan.perez@test.com",
            "role": "recepcionista"
    };
    
    const datosFicha = {
        "id": id,
        "estado": "recepcionado",
        "fechaCreacion": fechaCreacion,
        "datosFicha":{
            "datosEquipo": datosEquipo,
            "usuario": usuario,
            "usuarioRecepcionista": usuarioRecepcionista,
        }
    };
    console.log(datosFicha);
    enviarFormulario(datosFicha);
}); 

const enviarFormulario = async (body) => {
    // datos que debe capturar el formulario

    try {
        await fetch(`${hostgateway}/computadorclinica`, {
            method: 'PUT',
            body: JSON.stringify(_body),
        });
        redireccionar(`${hosts3}/html/ingreso.html`);
    } catch (error) {
        debugger;
        return error;
    }
};

const redireccionar = (path) => {
    return window.location.href = path;
};

const logout = () => {
    sessionStorage.removeItem('datos');
    redireccionar(`${hosts3}/index.html`);
};