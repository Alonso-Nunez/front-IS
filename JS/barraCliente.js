var verToken = window.sessionStorage.getItem("access_token");
var tiposesion = window.sessionStorage.getItem("tipo_sesion");
var logout = document.getElementById("logout");

var formDatosCliente = document.getElementById("formularioDatosC");
var formEditarCliente = document.getElementById("formularioEditC");
var formEditarCont = document.getElementById("formularioEditClienteCont");

var divListaProdNeg = document.getElementById("lista-productos");

var listaReserva = document.getElementById("lista-reserva");

var botonEliminarCuenta = document.getElementById("eliminarcuenta");

if (verToken == null && tiposesion == null) {
  window.location.href = "inicioSesion.html";
} else if (verToken != null && tiposesion == "negocio") {
  window.alert(
    "No tienes permiso para acceder a esta pagina, se cerrara la sesion"
  );
  cerrar_session();
} else {
}

if (formDatosCliente != null) {

  fetch("http://127.0.0.1:8000/api/cliente/auth", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + verToken,
    },
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        formDatosCliente.nombre.value = response.data.nombre;
        formDatosCliente.telefono.value = response.data.telefono;
        formDatosCliente.direccion.value = response.data.direccion;
        formDatosCliente.correo.value = response.data.correo;
        window.sessionStorage.setItem("nombre_cli", response.data.nombre);
        window.sessionStorage.setItem("telefono_cli", response.data.telefono);
        window.sessionStorage.setItem("direccion_cli", response.data.direccion);
        window.sessionStorage.setItem("correo_cli", response.data.correo);
      } else {
        window.alert(response.messages[0]);
      }
    });
}

if (formEditarCliente != null) {
  //Servicio que devuelve información del cliente
  fetch("http://127.0.0.1:8000/api/cliente/auth", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + verToken,
    },
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        formEditarCliente.nombre.value = response.data.nombre;
        formEditarCliente.telefono.value = response.data.telefono;
        formEditarCliente.direccion.value = response.data.direccion;
        formEditarCliente.correo.value = response.data.correo;
      } else {
        window.alert(response.messages[0]);
      }
    });

  //Servicio que actualiza la información del cliente
  formEditarCliente.addEventListener("submit", function (e) {
    e.preventDefault();

    var datos = new FormData(formEditarCliente);
    fetch("http://127.0.0.1:8000/api/cliente", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + verToken,
      },
      body: JSON.stringify({
        nombre: datos.get("nombre"),
        direccion: datos.get("direccion"),
        telefono: datos.get("telefono"),
        correo: datos.get("correo"),
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          window.alert(response.messages[0]);
        } else {
          window.alert(response.messages[0]);
        }
      });
  });
}

//Servicio que actualiza la contraseña del cliente
if (formEditarCont != null) {
  formEditarCont,
    addEventListener("submit", function (e) {
      e.preventDefault();
      var datos = new FormData(formEditarCont);

      if (datos.get("password") == "") {
        window.alert("Es necesario ingresar los datos requeridos");
      } else if (datos.get("password2") == "") {
        window.alert("Es necesario ingresar una nueva contraseña");
      } else if (datos.get("password2") != datos.get("password3")) {
        window.alert("Las contraseñas no coinciden");
      } else if (datos.get("pasword") != datos.get("password")) {
        fetch("http://127.0.0.1:8000/api/cliente", {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + verToken,
          },
          body: JSON.stringify({
            nombre: window.sessionStorage.getItem("nombre_cli"),
            direccion: window.sessionStorage.getItem("direccion_cli"),
            telefono: window.sessionStorage.getItem("telefono_cli"),
            correo: window.sessionStorage.getItem("correo_cli"),
            password: datos.get("password2"),
          }),
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.success) {
              window.alert(response.messages[0]);
            } else {
              window.alert(response.messages[0]);
            }
          });
      } else if (datos.get("password") == datos.get("password2")) {
        window.alert("La nueva contraseña no puede ser igual a la anterior");
      }
    });
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
      if (response.success) {
        datos = response.data;
        console.log(datos)
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
                          <h1 class="card-title pricing-card-title precio"><span class="">$${
                            datos[index].precio
                          } c/u</span></h1>
  
                          <ul class="list-unstyled mt-3 mb-4">
                              <li></li>
                              <li>Negocio: <b>${datos[index].negocio}</b></li>
                              <li>${datos[index].nombre}</li>
                              <li>Cantidad disponible: ${
                                datos[index].disponibilidad
                              } </li>
                              <li>Promocion: ${datos[index].promocion}</li>
                          </ul>
                          <input type="submit" class="btn btn-success" value="Mas información" data-idx="${index}"><br>
                          <input type="number" value="0" id="quantity" name="quantity" min="1" max="${
                            datos[index].disponibilidad
                          }">
                          <input type="submit" class="btn btn-danger" value="Reservar" data-idP="${
                            datos[index].id
                          }" data-idN="${datos[index].negocio_id}">
                      </div>
                  </div>`;
          //Agrega otro div (fila) para los productos
          if (index != 0 && index % numElem == 0) {
            div = document.createElement("div");
            div.classList.add("card-deck", "mb-3", "text-center");
            divListaProdNeg.appendChild(div);
          }
        }

        var btnsReservar = document.getElementsByClassName("btn-danger");
        for (d of btnsReservar) {
          d.addEventListener("click", function () {
            var idP = this.getAttribute("data-idP");
            var idN = this.getAttribute("data-idN");
            var parent = this.parentElement;
            var cantidad = parent.childNodes[10].value;

            if (cantidad == 0) {
              window.alert("¡Agrega una cantidad a tu pedido!");
            } else {
              var datos = new FormData();
              datos.append("publicacion_id", idP);
              datos.append("negocio_id", idN);
              datos.append("cantidad", cantidad);
              fetch("http://127.0.0.1:8000/api/pedido", {
                method: "POST",
                headers: {
                  Authorization: "Bearer " + verToken,
                },
                body: datos,
              })
                .then((response) => response.json())
                .then((response) => {
                  if (response.success) {
                    window.alert(response.messages[0]);
                  } else {
                    window.alert(response.messages[0]);
                  }
                });
            }

            /**/
          });
        }

        var btnsInfo = document.getElementsByClassName("btn-success");
        for (e of btnsInfo) {
          e.addEventListener("click", function () {
            var idx = this.getAttribute("data-idx");
            var data = datos[idx];
            var parent = this.parentElement;
            var list = parent.childNodes[5];
            if (this.value == "Mas información") {
              list.innerHTML += `<li>Descripcion: ${data.descripcion}</li>
                              <li>Direccion: ${data.direccion}</li>
                              <li>Horario Cierre: ${data.horario_c}</li>`;
              this.value = "Menos información";
            } else if (this.value == "Menos información") {
              list.innerHTML = `<li></li>
                  <li>Negocio: <b>${data.negocio}</b></li>
                  <li>${data.nombre}</li>
                  <li>Cantidad disponible: ${data.disponibilidad} </li>
                  <li>Promocion: ${data.promocion}</li>`;
              this.value = "Mas información";
            }
          });
        }
      } else {
        window.alert(response.messages[0]);
      }
    });
}

if (listaReserva != null) {
  var datos = null;
  fetch("http://127.0.0.1:8000/api/pedido/cliente", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + verToken,
    },
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        datos = response.data;
        
        for (let index = 0; index < datos.length; index++) {
          listaReserva.innerHTML += `<tr>
                <th scope="col">
                    <center>${datos[index].producto}</center>
                </th>
                <th scope="col">
                    <center>${datos[index].cantidad}</center>
                </th>
                <th scope="col">
                    <center>$${datos[index].precio}</center>
                </th>
                <th scope="col">
                    <center>${datos[index].fecha}</center>
                </th>
                <th scope="col">
                    <center>${datos[index].hora}</center>
                </th>
                <th scope="col">
                    <center>${datos[index].negocio}</center>
                </th>
                <th scope="col">
                    <center>${datos[index].direccion}</center>
                </th>
                <th scope="col">
                    <center>$${datos[index].total}</center>
                </th>
                <th scope="col">
                    <center><button type="button" class="btn btn-danger" data-id="${index}">Eliminar</button>
                    </center>
                </th>
            </tr>`;
        }
  
          var btnsEliminar = document.getElementsByClassName("btn-danger");
          for (d of btnsEliminar) {
            d.addEventListener("click", function () {
              var id = this.getAttribute("data-id");
              var data = datos[id];
              
              fetch("http://127.0.0.1:8000/api/pedido/cliente/eliminar", {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + verToken
                  },
                  body: JSON.stringify(data)
                })
                .then((response) => response.json())
                .then((response) => {
                  if (response.success) {
                    window.alert(response.messages[0]);
                    location.reload();
                  } else {
                    window.alert(response.messages[0]);
                  }
                });
            });
          }
          
      } else {
        window.alert(response.messages[0]);
      }
    });
}

if (botonEliminarCuenta != null) {
  botonEliminarCuenta.addEventListener("click", function () {
    fetch("http://127.0.0.1:8000/api/cliente/destroy", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + verToken,
    },
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.success) {
        window.alert(response.messages[0]);
        cerrar_session();
      } else {
        window.alert(response.messages[0]);
      }
    });
  });
}

addEventListener("DOMContentLoaded", () => {
  const btn_menu = document.querySelector(".btn_menu");
  if (btn_menu) {
    btn_menu.addEventListener("click", () => {
      const menu_items = document.querySelector(".menu_items");
      menu_items.classList.toggle("show");
    });
  }
});

logout.addEventListener("click", () => {
  cerrar_session();
});

function cerrar_session() {
  window.sessionStorage.removeItem("access_token");
  window.sessionStorage.removeItem("tipo_sesion");
  window.sessionStorage.removeItem("nombre_cli");
  window.sessionStorage.removeItem("direccion_cli");
  window.sessionStorage.removeItem("telefono_cli");
  window.sessionStorage.removeItem("correo_cli");
  window.location.href = "inicioSesion.html";
}
