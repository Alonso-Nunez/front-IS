
<?php
$conexion = mysqli_connect("localhost:3306", "root", "", "pro_is");
if (!$conexion) {
    echo "Error: No se pudo conectar a MySQL." . PHP_EOL;
    echo "error: " . mysqli_connect_errno() . PHP_EOL;
    exit;
}
?>