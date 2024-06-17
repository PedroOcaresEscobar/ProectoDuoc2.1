let hosts3 = 'https://clinicaduoc.s3.amazonaws.com';
let hostgateway = 'https://i0ottrtiwa.execute-api.us-east-1.amazonaws.com';

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded with JavaScript');
    // obtener datos del usuario desde el sesionStorage
    let user = JSON.parse(sessionStorage.getItem('user'));
    // revisar si tiene los requerimientos para acceder al path
    // if (!user) {
    //     alert('Usuario no autorizado.');
    //     window.location.href = 'login.html';
    // }
});

const validarDatos = () => {
    alert('Datos validados');
};