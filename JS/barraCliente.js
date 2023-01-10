var verToken = window.sessionStorage.getItem('access_token');
var tiposesion = window.sessionStorage.getItem('tipo_sesion');
var logout = document.getElementById('logout');

var formDatosCliente = document.getElementById("formularioDatosC");
var formEditarCliente = document.getElementById("formularioEditC");

if (verToken == null && tiposesion == null) {
    window.location.href = 'inicioSesion.html';
}else if(verToken != null && tiposesion == "negocio"){
    window.alert("No tienes permiso para acceder a esta pagina, se cerrara la sesion");
    window.sessionStorage.removeItem('access_token');
    window.sessionStorage.removeItem('tipo_sesion');
    window.location.href = 'inicioSesion.html';
}else{

}

if (formDatosCliente != null) {

    /*console.log(formDatosCliente)
    console.log(formDatosCliente.nombre)*/

    fetch('http://127.0.0.1:8000/api/cliente/auth', {
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
            formDatosCliente.nombre.value = response.data.nombre;
            formDatosCliente.telefono.value = response.data.telefono;
            formDatosCliente.direccion.value = response.data.direccion;
            formDatosCliente.correo.value = response.data.correo;
        }
        else{
            window.alert(response.messages[0]);
        }
    })
}

if (formEditarCliente != null) {
    //Servicio que devuelve información del cliente
    fetch('http://127.0.0.1:8000/api/cliente/auth', {
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
            formEditarCliente.nombre.value = response.data.nombre;
            formEditarCliente.telefono.value = response.data.telefono;
            formEditarCliente.direccion.value = response.data.direccion;
            formEditarCliente.correo.value = response.data.correo;
        }
        else{
            window.alert(response.messages[0]);
        }
    })

    //Servicio que actualiza la información del cliente
    formEditarCliente.addEventListener('submit', function(e){
        e.preventDefault();
        console.log("click")
    
        var datos =  new FormData(formEditarCliente);
        fetch('http://127.0.0.1:8000/api/cliente', {
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

console.log(window.sessionStorage.getItem('access_token'));