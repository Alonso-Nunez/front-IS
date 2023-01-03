<!--formulario que puede editar el usuario tipo cliente
    para modificar sus datos-->
<?php
session_start();

if (!isset($_SESSION['usuario'])) {
    echo '
            <script> 
                alert("Inicia sesión para entrar a la página");
                windows.location = "/loginCliente.html";
            </script>
            ';
    session_destroy();
    die();
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, shrink-to-fit=no">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../CSS/estilosBarra.css">
    <link rel="stylesheet" href="../CSS/editarPerfil.css">
    <link rel="icon" type="image/x-icon" href="../IMG/logo.png">
    <script src="../JS/Barra.js" defer> </script>
</head>

<body>
    <!--menu-->
    <nav class="menu">
        <label class="logo">Green Food</label>
        <ul class="menu_items">
            <!--Editar perfil -->
            <li><a href="datosCliente.php"><i class="fa fa-user" aria-hidden="true"></i></a></li>
            <!--Carrito de compras-->
            <li><a href="#"><i class="fa fa-shopping-cart" aria-hidden="true"></i></a></li>
            <!--Salir-->
            <li><a href="cerrar_sesion.php"><i class="fa fa-sign-out" aria-hidden="true"></i></a></li>
        </ul>
        <sapn class="btn_menu">
            <i class="fa fa-bars"></i>
        </sapn>
    </nav>
    <!--Fin menu-->

    <!--Editar perfil --><Br><br>
    <form id="formulario" class="formulario" method="post">
        <center><label>
                <h2>B I E N V E N I D O</h2>
            </label>

            <label for="nombre">Nombre: <?php echo $_SESSION['usuario'] ?></label>
            <!--<input type="text" name="nombre" id="nombre">-->

            <label for="email">Correo: <?php echo $_SESSION['email'] ?></label>
            <!--<input type="text" name="apellidos" id="apellidos">-->

            <label for="telefono">Teléfono: <?php echo $_SESSION['telefono'] ?></label>
            <!--<input type="text" name="telefono" id="telefono">-->

            <label for="direccion">Dirección: <?php echo $_SESSION['direccion'] ?></label>
            <!--<input type="text" name="dir" id="direccion">-->

            <label for="contraseña">Contraseña: **********</label>
            <Br><Br>
            <a class="botonEditar" href="editarCliente.php"> Editar Datos </a>
            <br><br>
            <a class="botonEditar" href="editarContra.php"> Cambiar Contraseña </a>
    </form>



</body>

</html>