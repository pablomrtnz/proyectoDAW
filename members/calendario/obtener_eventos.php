<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "alcassabars_bd";

if (isset($_GET['fecha'])) {
    $fecha = $_GET['fecha'];
} else {
    http_response_code(400);
    echo json_encode(array('error' => 'Fecha no especificada'));
    exit();
}

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare("SELECT * FROM calendario WHERE fecha_calendario = :fecha");
    $stmt->bindParam(':fecha', $fecha);
    $stmt->execute();

    $events = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($events);

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(array('error' => 'Error en la conexión a la base de datos: ' . $e->getMessage()));
}

$conn = null;

?>
