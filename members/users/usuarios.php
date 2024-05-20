<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "alcassabars_bd";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(array('error' => 'Error de conexión: ' . $conn->connect_error));
    exit;
}

$sql = "SELECT user_id, user_name, user_username, user_admin FROM users";
$result = $conn->query($sql);

if ($result === false) {
    echo json_encode(array('error' => 'Error en la consulta: ' . $conn->error));
    $conn->close();
    exit;
}

$users = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($users);

?>