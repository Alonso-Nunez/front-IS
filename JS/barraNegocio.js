var verToken = window.sessionStorage.getItem('access_token');
var tiposesion = window.sessionStorage.getItem('tipo_sesion');
var logout = document.getElementById('logout');

var formDatosNeg = document.getElementById("formularioDatosN");
var formEditNeg = document.getElementById("formularioEditNeg");

if (formDatosNeg != null) {

    /*console.log(formDatosNeg)
    console.log(formDatosNeg.nombre)*/

    fetch('http://127.0.0.1:8000/api/negocio/auth', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ verToken
        }
    })
    .then(response => response.json())
    .then((response) => {
        console.log(response)
        console.log(response.data)
        if(response.success){
            formDatosNeg.nombre.value = response.data.nombre;
            formDatosNeg.telefono.value = response.data.telefono;
            formDatosNeg.dir.value = response.data.direccion;
            formDatosNeg.horario.value = response.data.horario;
            formDatosNeg.correo.value = response.data.correo;
        }
        else{
            window.alert(response.messages[0]);
        }
    })
}

if (formEditNeg != null) {
    //Servicio que devuelve información del negocio
    fetch('http://127.0.0.1:8000/api/negocio/auth', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ verToken
        }
    })
    .then(response => response.json())
    .then((response) => {
        if(response.success){
            formEditNeg.nombre.value = response.data.nombre;
            formEditNeg.telefono.value = response.data.telefono;
            formEditNeg.direccion.value = response.data.direccion;
            formEditNeg.horario.value = response.data.horario;
            formEditNeg.correo.value = response.data.correo;
        }
        else{
            window.alert(response.messages[0]);
        }
    })

    //Servicio que actualiza la información del negocio
    formEditNeg.addEventListener('submit', function(e){
        e.preventDefault();
        console.log("click")
    
        var datos =  new FormData(formEditNeg);
        fetch('http://127.0.0.1:8000/api/negocio', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ verToken
            },
            body: JSON.stringify({
                "nombre": datos.get('nombre'),
                "direccion": datos.get('direccion'),
                "telefono": datos.get('telefono'),
                "correo": datos.get('correo'),
                "horario": datos.get('horario'),
                "password": datos.get('password')})
        })
        .then(response => response.json())
        .then((response) => {
            console.log(response)
            console.log(response.data)
            if(response.success){
                window.alert(response.messages[0]);
            }
            else{
                window.alert(response.messages[0]);
            }
        })
    })
}

if (verToken == null && tiposesion == null) {
    window.location.href = 'inicioSesion.html';
}else if(verToken != null && tiposesion == "cliente"){
    window.alert("No tienes permiso para acceder a esta pagina, se cerrara la sesion");
    window.sessionStorage.removeItem('access_token');
    window.sessionStorage.removeItem('tipo_sesion');
    window.location.href = 'inicioSesion.html';
}

addEventListener('DOMContentLoaded', () =>{
    const btn_menu=document.querySelector('.btn_menu')
    if(btn_menu){
        btn_menu.addEventListener('click',()=>{
            const menu_items = document.querySelector ('.menu_items')
            menu_items.classList.toggle('show')
        })
    }
}

)

logout.addEventListener('click', () => {
    window.sessionStorage.removeItem('access_token');
    window.sessionStorage.removeItem('tipo_sesion');
    window.location.href = 'inicioSesion.html';
})

//console.log(window.sessionStorage.getItem('access_token'));