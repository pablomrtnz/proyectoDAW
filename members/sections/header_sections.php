<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "alcassabars_bd";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT * FROM sections WHERE section_show_in_menu = 1";
$result = $conn->query($sql);

$headerSections = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $headerSections[] = $row;
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($headerSections);

?>
