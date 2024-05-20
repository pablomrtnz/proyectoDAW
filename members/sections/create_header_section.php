<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if ($data === null) {
        echo json_encode(array('success' => false, 'error' => 'Error al decodificar JSON'));
        exit;
    }

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

    $sql = "INSERT INTO sections (section_name, section_content_html, section_show_in_menu) VALUES (?, ?, 1)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $sectionName, $sectionContent);

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
