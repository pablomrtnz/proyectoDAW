<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    
    $data = json_decode($json, true);

    if ($data === null) {
        echo json_encode(array('success' => false, 'error' => 'Error al decodificar JSON'));
        exit;
    }

    $sectionId = isset($data['section_id']) ? $data['section_id'] : '';
    $sectionName = isset($data['section_name']) ? $data['section_name'] : '';
    $sectionContent = isset($data['section_content_html']) ? $data['section_content_html'] : '';
    
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "alcassabars_bd";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Error de conexión: " . $conn->connect_error);
    }

    $sql = "UPDATE sections SET section_name = ?, section_content_html = ? WHERE section_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssi", $sectionName, $sectionContent, $sectionId);

    if ($stmt->execute()) {
        echo json_encode(array('success' => true));
    } else {
        echo json_encode(array('success' => false, 'error' => $conn->error));
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(array('success' => false, 'error' => 'Método no permitido'));
}

?>
