<?php

$data = json_decode(file_get_contents("php://input"));

if ($data) {
    $user_id = isset($data->id) ? intval($data->id) : null;
    $user_name = isset($data->name) ? trim($data->name) : null;
    $user_username = isset($data->username) ? trim($data->username) : null;
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
        echo json_encode(array('success' => false, 'error' => 'Error de conexión: ' . $conn->connect_error));
        exit;
    }

    $sql = "UPDATE users SET user_name = ?, user_username = ?, user_admin = ? WHERE user_id = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        echo json_encode(array('success' => false, 'error' => 'Error en la preparación de la consulta: ' . $conn->error));
        $conn->close();
        exit;
    }
    $stmt->bind_param("ssii", $user_name, $user_username, $user_admin, $user_id);

    if ($stmt->execute()) {
        echo json_encode(array('success' => true));
    } else {
        echo json_encode(array('success' => false, 'error' => 'Error en la ejecución de la consulta: ' . $stmt->error));
    }

    $stmt->close();
    $conn->close();

} else {
    echo json_encode(array('success' => false, 'error' => 'Datos no recibidos'));
}

?>