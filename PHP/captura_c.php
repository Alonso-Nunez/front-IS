
<?php
<<<<<<< HEAD
//Conexion a la base de datos
include 'coneccionbd.php';

//Obtenemos los datos del formulario
=======
>>>>>>> c3bd07f625807886cdfecb9cc57f4fb9a47bec0b
if ($_POST) {
    $nombres = $_POST['nombres'];
    $apellidos = $_POST['apellidos'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $contrasenia = $_POST['contrasenia'];
    $direccion = $_POST['direccion'];
<<<<<<< HEAD
    $contrasenia2 = $_POST['contrasenia2'];
}
//Verificamos que las contraseñas coincidan
if ($contrasenia != $contrasenia2) {
    echo '
        <script>
            alert("Las contraseñas no coinciden");
            window.location = "loginCliente.php";
        </script>
        ';
    //Cerramos la conexion
    mysqli_close($conexion);
    exit();
}
$nombre = $nombres . " " . $apellidos;
//Usamos un cifrado en la contraseña
$contra = hash('md5', $contrasenia, false);

//Verificamos que el correo no este registrado
$veri_correo = mysqli_query($conexion, "SELECT * FROM cliente WHERE email='$email'");
if (mysqli_num_rows($veri_correo) > 0) {
    echo '
        <script>
            alert("El correo ya esta registrado");
            window.location = "loginCliente.php";
        </script>
        ';
    //Cerramos la conexion
    mysqli_close($conexion);
    exit();
}

//Insertamos los datos en la tabla cliente
$query = "INSERT cliente (nombre, email, contrasenia, direccion, telefono) VALUES ('$nombre','$email','$contra','$direccion','$telefono')";
$result = mysqli_query($conexion, $query) or trigger_error("Query Failed! SQL: $query - Error: " . mysqli_error($conexion), E_USER_ERROR);
//Aviso de registro exitoso
if ($result) {
    echo '
        <script>
            alert("Registro exitoso");
        </script>
        ';
} else {
    echo '
        <script>
            alert("Error al registrar");
        </script>
        ';
}
//Cerramos la conexion
mysqli_close($conexion);
//Redireccionamos a la pagina de inicio
header("Location:loginCliente.php");
die();
?>
=======

    echo "Nombres: $nombres <br>";
    echo "Apellidos: $apellidos <br>";
    echo "Correo: $email <br>";
    echo "Telefono: $telefono <br>";
    echo "Contraseña: $contrasenia <br>";
    echo "Direccion: $direccion <br>";
}
?>
>>>>>>> c3bd07f625807886cdfecb9cc57f4fb9a47bec0b
