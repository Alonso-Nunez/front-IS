var verToken = window.sessionStorage.getItem("access_token");
var tiposesion = window.sessionStorage.getItem("tipo_sesion");

var logout = document.getElementById("logout");

var formDatosNeg = document.getElementById("formularioDatosN");
var formEditNeg = document.getElementById("formularioEditNeg");
var formEditCont = document.getElementById("formularioEditNegCont");

//ofertaNegocio.html
var formAddPublication = document.getElementById("procesar-oferta");

//catalogoNegocio.html
var divListaProdNeg = document.getElementById("lista-productos");
console.log(divListaProdNeg);

var formEditPublication = document.getElementById("editar-oferta");

var listaReserva = document.getElementById("lista-reserva");

if (formDatosNeg != null) {
  fetch("http://127.0.0.1:8000/api/negocio/auth", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + verToken,
    },
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      console.log(response.data);
      if (response.success) {
        formDatosNeg.nombre.value = response.data.nombre;
        formDatosNeg.telefono.value = response.data.telefono;
        formDatosNeg.direccion.value = response.data.direccion;
        formDatosNeg.horario_a.value = response.data.horario_a;
        formDatosNeg.horario_c.value = response.data.horario_c;
        formDatosNeg.correo.value = response.data.correo;
        window.sessionStorage.setItem("nombre_neg", formDatosNeg.nombre.value);
        window.sessionStorage.setItem("tel_neg", formDatosNeg.telefono.value);
        window.sessionStorage.setItem("correo_neg", formDatosNeg.correo.value);
        window.sessionStorage.setItem(
          "horario_aneg",
          formDatosNeg.horario_a.value
        );
        window.sessionStorage.setItem(
          "horario_cneg",
          formDatosNeg.horario_c.value
        );
        window.sessionStorage.setItem(
          "direccion_neg",
          formDatosNeg.direccion.value
        );
      } else {
        window.alert(response.messages[0]);
      }
    });
}

if (formEditNeg != null) {
  //Servicio que devuelve información del negocio
  fetch("http://127.0.0.1:8000/api/negocio/auth", {
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
        formEditNeg.nombre.value = response.data.nombre;
        formEditNeg.telefono.value = response.data.telefono;
        formEditNeg.direccion.value = response.data.direccion;
        formEditNeg.horario_a.value = response.data.horario_a;
        formEditNeg.horario_c.value = response.data.horario_c;
        formEditNeg.correo.value = response.data.correo;
      } else {
        window.alert(response.messages[0]);
      }
    });

  //Servicio que actualiza la información del negocio
  formEditNeg.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("click");

    var datos = new FormData(formEditNeg);
    fetch("http://127.0.0.1:8000/api/negocio", {
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
        horario_a: datos.get("horario_a"),
        horario_c: datos.get("horario_c"),
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        console.log(response.data);
        if (response.success) {
          window.alert(response.messages[0]);
        } else {
          window.alert(response.messages[0]);
        }
      });
  });
}
//Editar contraseña
if (formEditCont != null) {
  formEditCont.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("click");
    var datos = new FormData(formEditCont);

    if (datos.get("password") == "") {
      window.alert("Es necesario ingresar los datos requeridos");
    } else if (datos.get("password2") == "") {
      window.alert("Es necesario ingresar una nueva contraseña");
    } else if (datos.get("password2") != datos.get("password3")) {
      window.alert("Las nuevas constraseñas no coinciden");
    } else if (datos.get("password") != datos.get("password2")) {
      fetch("http://127.0.0.1:8000/api/negocio", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + verToken,
        },
        body: JSON.stringify({
          nombre: window.sessionStorage.getItem("nombre_neg"),
          correo: window.sessionStorage.getItem("correo_neg"),
          telefono: window.sessionStorage.getItem("tel_neg"),
          direccion: window.sessionStorage.getItem("direccion_neg"),
          horario_a: window.sessionStorage.getItem("horario_aneg"),
          horario_c: window.sessionStorage.getItem("horario_cneg"),
          password: datos.get("password2"),
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          console.log(response.data);
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

/*ofertaNegocio.html
Crea las publicaciones en la base de datos
*/
if (formAddPublication != null) {
  formAddPublication.addEventListener("submit", function (e) {
    e.preventDefault();
    //console.log("click")

    var datos = new FormData(formAddPublication);
    var file = document.getElementById("upload").files[0];
    //console.log(file)
    datos.append("image", file);
    fetch("http://127.0.0.1:8000/api/publicacion", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + verToken,
      },
      body: datos,
    })
      .then((response) => response.json())
      .then((response) => {
        //console.log(response)
        //console.log(response.data)
        if (response.success) {
          window.alert(response.messages[0]);
        } else {
          window.alert(response.messages[0]);
        }
      });
  });
}

/*catalogoNegocio.html
Muestra los prodctos creados por el negocio
*/
if (divListaProdNeg != null) {
  var datos = null;
  fetch("http://127.0.0.1:8000/api/publicaciones", {
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
      console.log(response.data);
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
                        <h1 class="card-title pricing-card-title precio"><span class="">$${
                          datos[index].precio
                        } c/u</span></h1>

                        <ul class="list-unstyled mt-3 mb-4">
                            <li></li>
                            <li>${datos[index].nombre}</li>
                            <li>${datos[index].descripcion}</li>
                            <li>Cantidad Disponible: ${
                              datos[index].disponibilidad
                            } </li>
                            <li>Promocion: ${datos[index].promocion}</li>
                        </ul>
                        <input type="submit" class="btn btn-success" value="Editar" data-id="${
                          datos[index].id
                        }">
                        <input type="submit" class="btn btn-danger" value="Eliminar" data-id="${
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

        var btnsDelete = document.getElementsByClassName("btn-danger");
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
        }
      } else {
        window.alert(response.messages[0]);
      }
    });
}

if (formEditPublication != null) {
  var idPub = window.sessionStorage.getItem("publicacion_id");
  //Servicio que devuelve información del negocio
  fetch("http://127.0.0.1:8000/api/publicacion/" + idPub, {
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
        formEditPublication.titulo.value = response.data.titulo;
        formEditPublication.nombre.value = response.data.nombre;
        formEditPublication.promocion.value = response.data.promocion;
        formEditPublication.precio.value = response.data.precio;
        formEditPublication.cantidad.value = response.data.disponibilidad;
        formEditPublication.descripcion.value = response.data.descripcion;
      } else {
        window.alert(response.messages[0]);
      }
    });

  //Servicio que actualiza la información del negocio
  formEditPublication.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("click");

    var datos = new FormData(formEditPublication);
    fetch("http://127.0.0.1:8000/api/publicacion/" + idPub, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + verToken,
      },
      body: datos,
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        console.log(response.data);
        if (response.success) {
          window.alert(response.messages[0]);
          window.location.href = "catalogoNegocio.html";
        } else {
          window.alert(response.messages[0]);
        }
      });
  });
}

if (listaReserva != null) {
  var datos = null;
  fetch("http://127.0.0.1:8000/api/pedido/negocio", {
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
          console.log(datos[index])
          listaReserva.innerHTML += `<tr>
                <th scope="col">
                    <center>${datos[index].cliente}</center>
                </th>
                <th scope="col">
                    <center>${datos[index].telefono}</center>
                </th>
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
                    <center>$${datos[index].total}</center>
                </th>
                <th scope="col">
                    <center><button type="button" class="btn btn-danger" data-id="${index}">Rechazar</button>
                    </center>
                </th>
            </tr>`;
        }
  
          var btnsRechazar = document.getElementsByClassName("btn-danger");
          for (d of btnsRechazar) {
            d.addEventListener("click", function () {
              var id = this.getAttribute("data-id");
              var data = datos[id];
              console.log(data)

              fetch("http://127.0.0.1:8000/api/pedido/negocio/rechazar", {
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

if (verToken == null && tiposesion == null) {
  window.location.href = "inicioSesion.html";
} else if (verToken != null && tiposesion == "cliente") {
  window.alert(
    "No tienes permiso para acceder a esta pagina, se cerrara la sesion"
  );
  cerrar_session();
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
  window.sessionStorage.removeItem("nombre_neg");
  window.sessionStorage.removeItem("tel_neg");
  window.sessionStorage.removeItem("correo_neg");
  window.sessionStorage.removeItem("direccion_neg");
  window.sessionStorage.removeItem("horario_aneg");
  window.sessionStorage.removeItem("horario_cneg");
  window.location.href = "inicioSesion.html";
}

//console.log(window.sessionStorage.getItem('access_token'));
