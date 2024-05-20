<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "alcassabars_bd";

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['lineasPresupuesto']) || !is_array($data['lineasPresupuesto'])) {
    http_response_code(400); // Bad Request
    echo json_encode(['error' => 'Datos de líneas presupuestarias no válidos']);
    exit();
}

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500); 
    echo json_encode(['error' => 'Error de conexión a la base de datos: ' . $conn->connect_error]);
    exit();
}

$sql_insert = "INSERT INTO linea_presupuesto (id_nivel, importe) VALUES (?, ?)";
$stmt = $conn->prepare($sql_insert);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al preparar la consulta de inserción: ' . $conn->error]);
    exit();
}

foreach ($data['lineasPresupuesto'] as $linea) {
    $idNivel = $linea['id_nivel'];
    $importe = $linea['valor'];

    $stmt->bind_param("is", $idNivel, $importe);
    $result = $stmt->execute();

    if (!$result) {
        http_response_code(500); 
        echo json_encode(['error' => 'Error al insertar la línea presupuestaria: ' . $conn->error]);
        exit();
    }
}

$stmt->close();
$conn->close();

http_response_code(200);
echo json_encode(['success' => true]);

?>