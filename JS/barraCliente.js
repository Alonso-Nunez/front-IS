var verToken = window.sessionStorage.getItem('access_token');
var tiposesion = window.sessionStorage.getItem('tipo_sesion');
var logout = document.getElementById('logout');

var formDatosCliente = document.getElementById("formularioDatosC");
var formEditarCliente = document.getElementById("formularioEditC");

var divListaProdNeg = document.getElementById("lista-productos");
console.log(divListaProdNeg)

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

if (divListaProdNeg != null) {
    var datos = null;
    fetch("http://127.0.0.1:8000/api/publicacion", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + verToken,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        //console.log(response)
        //console.log(response.data)
        if (response.success) {
          datos = response.data;
          const host = "http://127.0.0.1:8000";
          //La siguiente variable cambia el numero de productos por fila
          var numElem = 2;
  
          var div = document.createElement("div");
          div.classList.add("card-deck", "mb-3", "text-center");
          divListaProdNeg.appendChild(div);
          for (let index = 0; index < datos.length; index++) {
            div.innerHTML += `<div class="card mb-4 shadow-sm">
                      <div class="card-header">
                          <h4 class="my-0 font-weight-bold">${
                            datos[index].titulo
                          }</h4>
                      </div>
                      <div class="card-body">
                          <img src="${
                            host + datos[index].pathImage
                          }" class="card-img-top">
                          <h1 class="card-title pricing-card-title precio"><span class="">${
                            datos[index].precio
                          }</span></h1>
  
                          <ul class="list-unstyled mt-3 mb-4">
                              <li></li>
                              <li>Negocio: <b>${datos[index].negocio}</b></li>
                              <li>${datos[index].nombre}</li>
                              <li>${datos[index].descripcion}</li>
                              <li>Cantidad Disponible: ${
                                datos[index].disponibilidad
                              } </li>
                              <li>Promocion: ${datos[index].promocion}</li>
                          </ul>
                          <input type="submit" class="btn btn-success" value="Mas información" data-id="${
                            datos[index].id
                          }">
                          <input type="submit" class="btn btn-danger" value="Reservar" data-id="${
                            datos[index].id
                          }">
                      </div>
                  </div>`;
            //Agrega otro div (fila) para los productos
            if (index != 0 && index % numElem == 0) {
              //console.log(index)
              div = document.createElement("div");
              div.classList.add("card-deck", "mb-3", "text-center");
              divListaProdNeg.appendChild(div);
            }
          }
  
          /*var btnsDelete = document.getElementsByClassName("btn-danger");
          for (d of btnsDelete) {
            d.addEventListener("click", function () {
              var id = this.getAttribute("data-id");
              fetch("http://127.0.0.1:8000/api/publicacion/" + id, {
                method: "DELETE",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + verToken,
                },
              })
                .then((response) => response.json())
                .then((response) => {
                  //console.log(response)
                  if (response.success) {
                    window.alert(response.messages[0]);
                    location.reload();
                  } else {
                    window.alert(response.messages[0]);
                  }
                });
            });
          }
  
          var btnsEdit = document.getElementsByClassName("btn-success");
          for (e of btnsEdit) {
            e.addEventListener("click", function () {
              var idP = this.getAttribute("data-id");
              window.sessionStorage.setItem("publicacion_id", idP);
              window.location.href = "editarOfertaNegocio.html";
            });
          }*/
        } else {
          window.alert(response.messages[0]);
        }
      });
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