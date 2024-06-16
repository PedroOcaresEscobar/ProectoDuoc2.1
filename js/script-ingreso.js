//Acordeon
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
}
const createdAt = () => {
    const fecha = new Date().toISOString();
    return fecha;
};

const user = () => {
    const nombre = document.getElementById('inputNombre').value;
    const email = document.getElementById('inputEmail').value;
    const rut = document.getElementById('inputRut').value;
    const telefono = document.getElementById('inputTelefono').value;
    return {nombre, email, rut, telefono};
};

const select = (idSelect) => {
    const selector = document.getElementById(idSelect);
    const opcion = selector.options[selector.selectedIndex].text;
    return opcion
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

const infoEquipo = () => {
    const marca = document.getElementById('inputMarca').value;
    const modelo = document.getElementById('inputModelo').value;
    const serie = document.getElementById('inputSerie').value;
    const observacion = document.getElementById('inputObservaciones').value;
    const ram = document.getElementById('inputRam').value;
    const procesador = document.getElementById('inputProcesador').value;
    const tiempoReparacion = document.getElementById('inputMinutes').value;
    const adicional = document.getElementById('inputObservaciones').value;
    const selectEquipo = select("tipoEquipo");
    const selectSistema = select("inputSistema");
    const garantia = checkbox("garantiaCheck");
    const cargador = checkbox("cargadorCheck");
    const almacenamiento = checkbox("almacenamientoCheck");
    
    return {marca, modelo, serie, garantia, cargador, observacion, almacenamiento, ram, procesador, tiempoReparacion, adicional, selectEquipo, selectSistema};
};

document.getElementById('guardar').addEventListener('click', () => {

    const id = UUID();
    const fechaCreacion = createdAt();
    const usuario = user();
    const datosEquipo = infoEquipo();
    
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
    return datosFicha;

}); 