<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "alcassabars_bd";

try {

    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT n.id_nivel, n.desc_nivel, t.desc_tipo FROM nivel n JOIN tipo t ON n.id_tipo = t.id_tipo";

    $stmt = $conn->query($sql);
    $lineas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($lineas);
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al obtener todas las líneas presupuestarias: ' . $e->getMessage()]);
}

$conn = null;

?>