
<?php
//Conexion a la base de datos
include 'coneccionbd.php';
//Iniciamos la sesion
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
//Obtenemos los datos del formulario de cambio de datos
if ($_POST) {
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $direccion = $_POST['direccion'];
    $telefono = $_POST['telefono'];
}
//Actualizamos los datos del usuario usando el id de la sesion
$query = "UPDATE cliente SET nombre='$nombre', email='$email', direccion='$direccion', telefono='$telefono' WHERE id_cliente='$_SESSION[id]'";
$result = mysqli_query($conexion, $query) or trigger_error("Query Failed! SQL: $query - Error: " . mysqli_error($conexion), E_USER_ERROR);
//Guardamos los datos en la sesion
$_SESSION['usuario'] = $nombre;
$_SESSION['email'] = $email;
$_SESSION['direccion'] = $direccion;
$_SESSION['telefono'] = $telefono;
//Cerramos la conexion
mysqli_close($conexion);
//Redireccionamos a la pagina de inicio
header("Location:datosCliente.php");
die();

?>