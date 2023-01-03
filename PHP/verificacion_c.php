
<?php
//Conexion a la base de datos
include 'coneccionbd.php';

//Iniciamos la sesion
session_start();
//Obtenemos los datos del formulario de inicio de sesion
if ($_POST) {
    $email = $_POST['email'];
    $contrasenia = $_POST['contrasenia'];
}
$contra = hash('md5', $contrasenia, false);

//Verificamos que el usuario exista
$query = "SELECT * FROM cliente WHERE email='$email' AND contrasenia='$contra'";
$result = mysqli_query($conexion, $query) or trigger_error("Query Failed! SQL: $query - Error: " . mysqli_error($conexion), E_USER_ERROR);
if (mysqli_num_rows($result) > 0) {
    //Obtenemos los datos del usuario
    $row = mysqli_fetch_assoc($result);
    $nombre = $row['nombre'];
    $id = $row['id_cliente'];
    $email = $row['email'];
    $direccion = $row['direccion'];
    $telefono = $row['telefono'];
    //Guardamos los datos en la sesion
    $_SESSION['usuario'] = $nombre;
    $_SESSION['id'] = $id;
    $_SESSION['email'] = $email;
    $_SESSION['direccion'] = $direccion;
    $_SESSION['telefono'] = $telefono;
    //Cerramos la conexion
    mysqli_close($conexion);
    //Redireccionamos a la pagina de inicio
    header("Location:barraCliente.php");
    die();
} else {
    echo '
        <script>
            alert("Usuario o contraseña incorrectos");
            window.location = "loginCliente.php";
        </script>
        ';
    //Cerramos la conexion
    mysqli_close($conexion);
    die();
}

?>