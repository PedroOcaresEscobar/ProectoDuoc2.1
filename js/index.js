let hosts3 = 'https://clinicaduoc.s3.amazonaws.com';
let hostgateway = 'https://i0ottrtiwa.execute-api.us-east-1.amazonaws.com';

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded with JavaScript');
});


const validacionesLogin = () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    if (!email || !password) {
        alert('Email y password son obligatorios.');
        return;
    }
    if (!validaEmail(email)) {
        alert('Email no válido.');
        return;
    }
    login({ email, password })
};

const login = async (body) => {
    try {
        const response = await fetch(`${hostgateway}/login`, {
            method: 'POST',
            body: JSON.stringify(body),
        });
        const _response = await response.json(); 
        debugger;
        if(_response === 'Usuario no encontrado.'){
            alert('Usuario no encontrado.');
            return;
        }   
        sessionStorage.setItem('user', JSON.stringify(_response));
        redireccionar(`${hosts3}/index.html`);
    } catch (error) {
        return error;
    }
};

const redireccionar = (path) => {
    return window.location.href = path;
};


const validaEmail = (email) => {
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
};