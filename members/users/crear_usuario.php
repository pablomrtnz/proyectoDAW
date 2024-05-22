<?php

$data = json_decode(file_get_contents("php://input"));

if ($data) {
    $user_name = isset($data->name) ? $data->name : '';
    $user_username = isset($data->username) ? $data->username : '';
    $user_password = isset($data->password) ? $data->password : '';
    $user_admin = isset($data->user_admin) ? $data->user_admin : 0; 

    if (empty($user_name) || empty($user_username) || empty($user_password)) {
        echo json_encode(array('success' => false, 'error' => 'Todos los campos son requeridos'));
        exit;
    }

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "alcassabars_bd";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Error de conexión: " . $conn->connect_error);
    }

    $sql = "INSERT INTO users (user_name, user_username, user_password, user_admin) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssi", $user_name, $user_username, $user_password, $user_admin);

    if ($stmt->execute()) {
        echo json_encode(array('success' => true));
    } else {
        echo json_encode(array('success' => false, 'error' => 'Error al crear usuario: ' . $conn->error));
    }

    $stmt->close();
    $conn->close();

} else {
    echo json_encode(array('success' => false, 'error' => 'Datos no recibidos'));
}

?>