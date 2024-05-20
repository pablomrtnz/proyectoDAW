<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') { 
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if ($data === null) {
        echo json_encode(array('success' => false, 'error' => 'Error al decodificar JSON'));
        exit;
    }

    $date = isset($data['fecha_calendario']) ? $data['fecha_calendario'] : '';
    $eventName = isset($data['descripcion_calendario']) ? $data['descripcion_calendario'] : '';

    if (empty($date) || empty($eventName)) {
        echo json_encode(array('success' => false, 'error' => 'La fecha y la descripción son campos requeridos'));
    exit;
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "alcassabars_bd";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(array('success' => false, 'error' => 'Error de conexión: ' . $conn->connect_error));
    exit;
}

$sql = "INSERT INTO calendario (fecha_calendario, descripcion_calendario) VALUES (?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(array('success' => false, 'error' => 'Error al preparar la consulta: ' . $conn->error));
    exit;
}

$stmt->bind_param("ss", $date, $eventName);

if ($stmt->execute()) {
    echo json_encode(array('success' => true));
} else {
    echo json_encode(array('success' => false, 'error' => 'Error al guardar el evento en el calendario: ' . $stmt->error));
}

$stmt->close();
$conn->close();
}

?>