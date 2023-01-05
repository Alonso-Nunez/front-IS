var verToken = window.sessionStorage.getItem('access_token');
var tiposesion = window.sessionStorage.getItem('tipo_sesion');
var logout = document.getElementById('logout');

if (verToken == null && tiposesion == null) {
    window.location.href = 'inicioSesion.html';
}else if(verToken != null && tiposesion == "negocio"){
    window.alert("No tienes permiso para acceder a esta pagina, se cerrara la sesion");
    window.sessionStorage.removeItem('access_token');
    window.sessionStorage.removeItem('tipo_sesion');
    window.location.href = 'inicioSesion.html';
}else{

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