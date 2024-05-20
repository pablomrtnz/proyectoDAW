<?php

$user_id = isset($_GET['id']) ? intval($_GET['id']) : null;

if ($user_id) {
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "alcassabars_bd";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        echo json_encode(array('success' => false, 'error' => 'Error de conexión: ' . $conn->connect_error));
        exit;
    }

    $sql = "DELETE FROM users WHERE user_id = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        echo json_encode(array('success' => false, 'error' => 'Error en la preparación de la consulta: ' . $conn->error));
        $conn->close();
        exit;
    }
    
    $stmt->bind_param("i", $user_id); 
    if ($stmt->execute()) {
        echo json_encode(array('success' => true));
    } else {
        echo json_encode(array('success' => false, 'error' => 'Error al eliminar usuario: ' . $stmt->error));
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(array('success' => false, 'error' => 'ID de usuario no válido'));
}

?>