<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "alcassabars_bd";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if (isset($_GET['id'])) {

    $acta_id = $_GET['id'];

    $sql = "SELECT acta_name, acta_document FROM actas WHERE acta_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $acta_id);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($acta_name, $acta_document);
        $stmt->fetch();

        header("Content-type: application/pdf");
        
        $download_filename = $acta_name . ".pdf";
        header("Content-Disposition: attachment; filename=\"" . $download_filename . "\"");

        echo $acta_document;
    } else {
        echo 'Acta no encontrada.';
    }

    $stmt->close();
    $conn->close();
} else {
    echo 'ID de acta no proporcionado.';
}

?>