<?php

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $section_id = isset($_GET['id']) ? $_GET['id'] : null;

    if ($section_id) {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "alcassabars_bd";

        $conn = new mysqli($servername, $username, $password, $dbname);

        if ($conn->connect_error) {
            die("Error de conexión: " . $conn->connect_error);
        }

        $sql = "DELETE FROM sections WHERE section_id = ?";
        $stmt = $conn->prepare($sql);
        
        $stmt->bind_param("i", $section_id);

        if ($stmt->execute()) {
            echo json_encode(array('success' => true));
        } else {
            echo json_encode(array('success' => false, 'error' => 'Error al eliminar la sección'));
        }

        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(array('success' => false, 'error' => 'ID de sección no válido'));
    }
} else {
    echo json_encode(array('success' => false, 'error' => 'Método no permitido'));
}

?>