<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "alcassabars_bd";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $year = filter_input(INPUT_POST, 'acta_year', FILTER_VALIDATE_INT);
    $name = filter_input(INPUT_POST, 'acta_name', FILTER_SANITIZE_STRING);

    if ($_FILES['acta_document']['error'] === UPLOAD_ERR_OK) {
        $tmpFilePath = $_FILES['acta_document']['tmp_name'];
        $fileType = $_FILES['acta_document']['type'];

        if ($fileType === 'application/pdf') {
            $document = file_get_contents($tmpFilePath);

            // Preparar la consulta SQL
            $sql = "INSERT INTO actas (acta_year, acta_name, acta_document) VALUES (?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("iss", $year, $name, $document);

            // Ejecutar la consulta
            if ($stmt->execute()) {
                echo "Acta subida correctamente.";
            } else {
                echo "Error al subir el acta: " . $stmt->error;
            }

            $stmt->close();
        } else {
            echo "Error: El archivo debe ser un PDF.";
        }
    } else {
        echo "Error al subir el archivo.";
    }

    $conn->close();
} else {
    echo "Método no permitido para subir actas.";
}

?>