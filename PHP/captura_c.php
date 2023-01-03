
<?php
if ($_POST) {
    $nombres = $_POST['nombres'];
    $apellidos = $_POST['apellidos'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $contrasenia = $_POST['contrasenia'];
    $direccion = $_POST['direccion'];

    echo "Nombres: $nombres <br>";
    echo "Apellidos: $apellidos <br>";
    echo "Correo: $email <br>";
    echo "Telefono: $telefono <br>";
    echo "Contraseña: $contrasenia <br>";
    echo "Direccion: $direccion <br>";
}
?>
