<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "alcassabars_bd";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT acta_id, acta_year, acta_name FROM actas";
$result = $conn->query($sql);

$actas = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $actas[] = $row;
    }
}

echo json_encode($actas);

$conn->close();

?>