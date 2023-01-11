var verToken = window.sessionStorage.getItem('access_token');
var tiposesion = window.sessionStorage.getItem('tipo_sesion');
var logout = document.getElementById('logout');

var formDatosNeg = document.getElementById("formularioDatosN");
var formEditNeg = document.getElementById("formularioEditNeg");

//ofertaNegocio.html
var formAddPublication = document.getElementById("procesar-oferta");

//catalogoNegocio.html
var divListaProdNeg = document.getElementById("lista-productos");

if (formDatosNeg != null) {

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
            formDatosNeg.direccion.value = response.data.direccion;
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

/*ofertaNegocio.html
Crea las publicaciones en la base de datos
*/
if (formAddPublication != null) {
    formAddPublication.addEventListener('submit', function(e){
        e.preventDefault();
        //console.log("click")
    
        var datos =  new FormData(formAddPublication);
        var file = document.getElementById('upload').files[0];
        //console.log(file)
        datos.append("image", file);
        fetch('http://127.0.0.1:8000/api/publicacion', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '+ verToken
            },
            body: datos
        })
        .then(response => response.json())
        .then((response) => {
            //console.log(response)
            //console.log(response.data)
            if(response.success){
                window.alert(response.messages[0]);
            }
            else{
                window.alert(response.messages[0]);
            }
        })
    })
}

/*catalogoNegocio.html
Muestra los prodctos creados por el negocio
*/
if (divListaProdNeg != null) {
    var datos = null;
    fetch('http://127.0.0.1:8000/api/publicaciones', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ verToken
        }
    })
    .then(response => response.json())
    .then((response) => {
        //console.log(response)
        //console.log(response.data)
        if(response.success){
            datos = response.data;
            const host = 'http://127.0.0.1:8000';
            //La siguiente variable cambia el numero de productos por fila
            var numElem = 3;

            var div = document.createElement("div");
            div.classList.add('card-deck', 'mb-3', 'text-center');
            divListaProdNeg.appendChild(div);
            for (let index = 0; index < datos.length; index++) {
                div.innerHTML += `<div class="card mb-4 shadow-sm">
                    <div class="card-header">
                        <h4 class="my-0 font-weight-bold">${datos[index].titulo}</h4>
                    </div>
                    <div class="card-body">
                        <img src="${host + datos[index].pathImage}" class="card-img-top">
                        <h1 class="card-title pricing-card-title precio"><span class="">${datos[index].precio}</span></h1>

                        <ul class="list-unstyled mt-3 mb-4">
                            <li></li>
                            <li>${datos[index].nombre}</li>
                            <li>${datos[index].descripcion}</li>
                            <li>Cantidad Disponible: ${datos[index].disponibilidad} </li>
                        </ul>
                        <a href="editarOfertaNegocio.html" class="btn btn-success" data-id="1">Editar</a>
                        <input type="submit" class="btn btn-danger" value="Eliminar" data-id="${datos[index].id}">
                    </div>
                </div>`; 
                //Agrega otro div (fila) para los productos
                if (index != 0 && (index%numElem) == 0) {
                    //console.log(index)
                    div = document.createElement("div");
                    div.classList.add('card-deck', 'mb-3', 'text-center');
                    divListaProdNeg.appendChild(div);
                }
            }

            var elements = document.getElementsByClassName("btn-danger");
            for (i of elements) {
                i.addEventListener('click', function() {
                    var id = this.getAttribute('data-id');
                    fetch('http://127.0.0.1:8000/api/publicacion/'+id, {
                        method: 'DELETE',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer '+ verToken
                        }
                    })
                    .then(response => response.json())
                    .then((response) => {
                        //console.log(response)
                        if(response.success){
                            window.alert(response.messages[0]);
                            location.reload();
                        }
                        else{
                            window.alert(response.messages[0]);
                        }
                    })
                });
            }
        }
        else{
            window.alert(response.messages[0]);
        }
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