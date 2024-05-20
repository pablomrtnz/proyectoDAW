<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "alcassabars_bd";

$year = $_POST['year'];

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

$sql_last_id = "SELECT MAX(id_presupuesto) as last_id FROM presupuesto";
$result = $conn->query($sql_last_id);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $last_id = $row["last_id"];
    $new_id = $last_id + 1;
} else {
    $new_id = 1; 
}

$sql_insert = "INSERT INTO presupuesto (id_presupuesto, user_admin, año) VALUES ($new_id, 1, '$year')";

$response = array();

if ($conn->query($sql_insert) === TRUE) {
    $response["success"] = true;
    $response["id_presupuesto"] = $new_id;
} else {
    $response["success"] = false;
    $response["error"] = $conn->error;
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($response);

?>