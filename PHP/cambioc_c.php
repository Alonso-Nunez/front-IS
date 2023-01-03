
<?php
include 'coneccionbd.php';

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
//Obtenemos los datos del formulario de cambio de contraseña
if ($_POST) {
    $acontra = hash("md5", $_POST['apass'], false);
    $ncontra = $_POST['npass'];
    $ncontra2 = $_POST['npass2'];
}
//Verificamos que la contraseña actual sea correcta
$query = "SELECT * FROM cliente WHERE id_cliente='$_SESSION[id]' AND contrasenia='$acontra'";
$result = mysqli_query($conexion, $query) or trigger_error("Query Failed! SQL: $query - Error: " . mysqli_error($conexion), E_USER_ERROR);
if (mysqli_num_rows($result) > 0) {
    //Verificamos que las contraseñas nuevas coincidan
    if ($ncontra == $ncontra2) {
        //Actualizamos la contraseña del usuario usando el id de la sesion
        $contra = hash("md5", $ncontra, false);
        $query = "UPDATE cliente SET contrasenia='$contra' WHERE email='$_SESSION[email]'";
        $result = mysqli_query($conexion, $query) or trigger_error("Query Failed! SQL: $query - Error: " . mysqli_error($conexion), E_USER_ERROR);
        //Cerramos la conexion
        mysqli_close($conexion);
        //Redireccionamos a la pagina de inicio
        header("Location:datosCliente.php");
        die();
    } else {
        echo '
            <script>
                alert("Las contraseñas nuevas no coinciden");
                window.location = "EditarContra.php";
            </script>
            ';
        //Cerramos la conexion
        mysqli_close($conexion);
        die();
    }
} else {
    echo '
        <script>
            alert("Contraseña actual incorrecta");
            window.location = "EditarContra.php";
        </script>
        ';
    //Cerramos la conexion
    mysqli_close($conexion);
    die();
}

?>