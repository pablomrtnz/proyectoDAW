<?php

$user_id = isset($_GET['id']) ? $_GET['id'] : null;

if ($user_id) {
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "alcassabars_bd";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Error de conexión: " . $conn->connect_error);
    }

    $sql = "DELETE FROM users WHERE user_id = ?";
    $stmt = $conn->prepare($sql);

    $stmt->bind_param("i", $user_id); 
    if ($stmt->execute()) {
        echo json_encode(array('success' => true));
    } else {
        echo json_encode(array('success' => false, 'error' => $conn->error));
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(array('success' => false, 'error' => 'ID de usuario no válido'));
}

?>