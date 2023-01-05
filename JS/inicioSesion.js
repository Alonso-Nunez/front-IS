var verToken = window.sessionStorage.getItem('access_token');
var tiposesion = window.sessionStorage.getItem('tipo_sesion');

if(verToken != null){
    if(tiposesion == "cliente"){
        window.location.href = 'catalogoCliente.html';
    }
    if(tiposesion == "negocio"){
        window.location.href = 'catalogoNegocio.html';
    }
}