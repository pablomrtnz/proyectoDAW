<?php

$data = json_decode(file_get_contents("php://input"));

if ($data) {
    $user_id = $data->id;
    $user_name = $data->name;
    $user_username = $data->username;
    $user_admin = isset($data->admin) ? ($data->admin ? 1 : 0) : 0;
    
    if (empty($user_id) || empty($user_name) || empty($user_username)) {
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

    $sql = "UPDATE users SET user_name = ?, user_username = ?, user_admin = ? WHERE user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssii", $user_name, $user_username, $user_admin, $user_id);

    if ($stmt->execute()) {
        echo json_encode(array('success' => true));
    } else {
        echo json_encode(array('success' => false, 'error' => $conn->error));
    }

    $stmt->close();
    $conn->close();

} else {
    echo json_encode(array('success' => false, 'error' => 'Datos no recibidos'));
}

?>