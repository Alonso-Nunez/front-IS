document.getElementById("btn_registrarse").addEventListener("click", register);
document
  .getElementById("btn_iniciarSesion")
  .addEventListener("click", iniciarS);
window.addEventListener("resize", anchoPagina);

//Declarar variables
var contenedor__Formularios = document.querySelector(".contenedor_Formularios");
var formulario__iniciarSesion = document.querySelector(
  ".formulario_iniciarSesion"
);
var formulario__Registrarse = document.querySelector(".formulario_Registrarse");
var caja__fondoLogin = document.querySelector(".caja_fondoLogin");
var caja__fondoRegistro = document.querySelector(".caja_fondoRegistro");
var formNegocioReg = document.getElementById("formnegocioregist");
var formNegocioLogin = document.getElementById("formnegociologin");

var verToken = window.sessionStorage.getItem("access_token");
var tiposesion = window.sessionStorage.getItem("tipo_sesion");
if (verToken != null && tiposesion == "negocio") {
  window.location.href = "catalogoNegocio.html";
} else if (verToken != null && tiposesion == "cliente") {
  window.alert("Debes cerrar la sesión del cliente para acceder como negocio");
  window.location.href = "catalogoCliente.html";
}

//Funcion para conectar con la API para el login
formNegocioLogin.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("click");
  var datos = new FormData(formNegocioLogin);
  fetch("http:///127.0.0.1:8000/api/login/negocio", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      correo: datos.get("correo"),
      password: datos.get("password"),
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      console.log(response.data);
      if (response.success) {
        var token = response.data.access_token;
        var tiposesion = "negocio";
        window.sessionStorage.setItem("access_token", token);
        window.sessionStorage.setItem("tipo_sesion", tiposesion);
        window.location.href = "catalogoNegocio.html";
      } else {
        window.alert(response.messages[0]);
        window.location.href = "loginNegocio.html";
      }
    });
});

//Funcion para conectar con la API para el registro
formNegocioReg.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("click");
  var datos = new FormData(formNegocioReg);

  if (datos.get("password") != datos.get("password1")) {
    window.alert("Las contraseñas no coinciden");
  } else {
    fetch("http://127.0.0.1:8000/api/negocio", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: datos.get("nombre"),
        direccion: datos.get("direccion"),
        telefono: datos.get("telefono"),
        correo: datos.get("correo"),
        horario_a: datos.get("horario_a"),
        horario_c: datos.get("horario_c"),
        password: datos.get("password"),
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
      })
      .finally(() => {
        window.location.href = "loginNegocio.html";
      });
  }
});

function anchoPagina() {
  if (window.innerWidth > 850) {
    caja__fondoLogin.style.display = "block";
    caja__fondoRegistro.style.display = "block";
  } else {
    caja__fondoLogin.style.display = "block";
    caja__fondoRegistro.style.opacity = "1";
    caja__fondoLogin.style.display = "none";
    formulario__Registrarse.style.display = "block";
    formulario__iniciarSesion.style.display = "none";
    contenedor__Formularios.style.left = "0px";
  }
}

anchoPagina();
function iniciarS() {
  if (window.innerWidth > 850) {
    formulario__Registrarse.style.display = "none";
    contenedor__Formularios.style.left = "10px";
    formulario__iniciarSesion.style.display = "block";
    caja__fondoRegistro.style.opacity = "1";
    caja__fondoLogin.style.opacity = "0";
  } else {
    formulario__Registrarse.style.display = "none";
    contenedor__Formularios.style.left = "0px";
    formulario__iniciarSesion.style.display = "block";
    caja__fondoRegistro.style.display = "block";
    caja__fondoLogin.style.display = "none";
  }
}

function register() {
  if (window.innerWidth > 850) {
    formulario__Registrarse.style.display = "block";
    contenedor__Formularios.style.left = "49%";
    formulario__iniciarSesion.style.display = "none";
    caja__fondoRegistro.style.opacity = "0";
    caja__fondoLogin.style.opacity = "1";
  } else {
    formulario__Registrarse.style.display = "block";
    contenedor__Formularios.style.left = "0%";
    formulario__iniciarSesion.style.display = "none";
    caja__fondoRegistro.style.display = "none";
    caja__fondoLogin.style.display = "block";
    caja__fondoLogin.style.opacity = "1";
  }
}
