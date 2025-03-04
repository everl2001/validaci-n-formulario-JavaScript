const firebaseConfig = {
    apiKey: "AIzaSyDCQcZx9QCB4ZZ6tY9uGAu1pn9-ePl3Gow",
    authDomain: "datos-formulario-xd.firebaseapp.com",
    projectId: "datos-formulario-xd",
    storageBucket: "datos-formulario-xd.firebasestorage.app",
    messagingSenderId: "414400177966",
    appId: "1:414400177966:web:51a04f9307cf44c6b6bcbf",
    measurementId: "G-MP0YKMCYFZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault()

    //VALIDAR CAMPO NOMBRE
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if (entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor, intoduci tu nombre'
        errorNombre.classList.add('error-message')
    } else {
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }

    //VALIDAR CORREO ELECTRONICO
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailEntrada.value)) {
        emailError.textContent = 'Por favor introduce un email valido'
        emailError.classList.add('error-message')
    } else {
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }
    //VALIDAR CONTRASENA
    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
        contrasenaError.textContent = 'La contrasena debe tener al menos 8 caracteres, numeros, mayusculas y minusculas y caracteres especiales'
        contrasenaError.classList.add('error-message')
    } else {
        contrasenaError.textContent = ''
        contrasenaError.classList.remove('error-message')
    }

    //SI TODOS LOS CAMPOS SON CORRECTOS, ENVIAR FORMULARIO
    if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {

        //BACKEND QUE RECIBA LA INFO
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
            .then((docRef) => {
                alert('El formulario se ha enviado con exito', docRef.id);
                document.getElementById('formulario').reset();
            })
            .catch((error) => {
                alert(error)
            });

    }
})