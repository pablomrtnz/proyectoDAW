<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "alcassabars_bd";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT DISTINCT año FROM presupuesto";

$result = $conn->query($sql);

$years = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $years[] = $row["año"];
    }
}

$conn->close();

echo json_encode($years);

?>