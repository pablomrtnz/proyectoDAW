<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "alcassabars_bd";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$año = isset($_GET['año']) ? intval($_GET['año']) : null;

if ($año === null) {
    http_response_code(400);
    echo json_encode(array('error' => 'Año no válido'));
    exit;
}

try {
    $sql = "SELECT
               SUM(CASE WHEN l.importe > 0 THEN l.importe ELSE 0 END) AS ingresos,
               SUM(CASE WHEN l.importe < 0 THEN l.importe ELSE 0 END) AS gastos
           FROM presupuesto p
           JOIN linea_presupuesto l ON l.id_presupuesto = p.id_presupuesto
           WHERE p.año = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $año);

    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows > 0) {

        $row = $result->fetch_assoc();
        $ingresos = floatval($row['ingresos']);
        $gastos = floatval($row['gastos']);

        $remanente = $gastos + $ingresos;

        $data = array(
            'ingresos' => $ingresos,
            'gastos' => $gastos,
            'remanente' => $remanente
        );

        echo json_encode($data);
    } else {
        http_response_code(404);
        echo json_encode(array('error' => 'No se encontraron datos para el año especificado'));
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array('error' => 'Error al procesar la solicitud'));
}

$stmt->close();
$conn->close();

?>