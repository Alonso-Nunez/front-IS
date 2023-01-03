<?php
session_start();

if (isset($_SESSION['usuario'])) {
    header("location:barraCliente.php");
}

?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Registro de Cliente</title>
    <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
    <meta name="description" content="">
    <meta name="keywords" content="">
    <link href="../CSS/login.css" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="../IMG/logo.png">
    <script type="text/javascript" src="../javaScript/encabezadoYPiePagina.js"></script>
</head>

<body onload="hF()">
    <div id="header" class="general">
    </div>
    <main>

        <div class="contedenor_todo">
            <div class="caja_fondo">
                <div class="caja_fondoLogin">
                    <h3>¿Ya tienes cuenta?</h3>
                    <p>Inicia sesión para entrar a la página</p>
                    <button id="btn_iniciarSesion">Iniciar Sesión</button>
                </div>
                <div class="caja_fondoRegistro">
                    <h3>¿Aún no tienes cuenta?</h3>
                    <p>Regístrate para que puedas iniciar sesión</p>
                    <button id="btn_registrarse">Registrarse</button>
                </div>
            </div>
            <!--Formulario para iniciar sesión y registrarse-->
            <div class="contenedor_Formularios">
                <!--Formulario para iniciar sesión-->
                <form action="verificacion_c.php" method="post" class="formulario_iniciarSesion">
                    <h2>Iniciar Sesión</h2>
                    <input type="email" name="email" placeholder="Correo electrónico" maxlength="100" data-validetta="required,maxLength[300]">
                    <input type="password" name="contrasenia" placeholder="Contraseña" maxlength="20" data-validetta="required,maxLength[20]">
                    <button><B>Entrar</B></button>
                </form>
                <!-- Mensajes de Verificación -->
                <div id="msg"></div>

                <div id="error" class="ocultar">
                    Las Contraseñas no coinciden, vuelve a intentar !
                </div>
                <div id="ok" class="ocultar">
                    Las Contraseñas coinciden ! (Procesando formulario ... )
                </div>
                <!--Formulario registrarse-->
                <form method="post" action="captura_c.php" class="formulario_Registrarse" onsubmit="verificarPasswords(); return false">
                    <BR><BR><BR>
                    <h2>Registro de Cliente</h2>

                    <input type="text" name="nombres" placeholder="Nombre(s)" maxlength="50" id="nombres" data-validetta="required,maxLength[50]">

                    <input type="text" name="apellidos" placeholder="Apellidos" maxlength="50" id="apellido_pa" data-validetta="required,maxLength[50]">

                    <input type="text" name="telefono" placeholder="Teléfono a 10 dígitos" maxlength="10" data-validetta="required,maxLength[10],number,minLength[10]">

                    <input type="email" name="email" placeholder="example@example.com" maxlength="100" data-validetta="required,maxLength[100],email">

                    <input type="text" name="direccion" placeholder="Dirección" maxlength="300" data-validetta="required,maxLength[300]">

                    <input type="password" id="pass" name="contrasenia" placeholder="Contraseña" maxlength="20" data-validetta="required,maxLength[20]">

                    <input type="password" id="pass2" name="contrasenia2" placeholder="Repite la Contraseña" maxlength="20" data-validetta="required,maxLength[20]">

                    <button id=><B>Registrarse</B></button>

                </form>

            </div>
        </div>
    </main>
    <script src="../JS/login.js"></script>
</body>

</html>