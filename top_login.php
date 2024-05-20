<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "alcassabars_bd";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Error en la conexión: " . $conn->connect_error);
}

if ($stmt = $conn->prepare("SELECT user_id, user_name, user_admin FROM users WHERE user_username = ? AND user_password = ?")) {
    $stmt->bind_param("ss", $username, $password);

    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    $stmt->execute();

    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();

        session_start();
        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['user_name'] = $user['user_name'];
        $_SESSION['user_admin'] = $user['user_admin'];

        header("Location: members/socios.php");
        exit();
    } else {
        header("Location: login.php?error=1");
        exit();
    }

    $stmt->close();
} else {
    die("Error en la preparación de la consulta: " . $conn->error);
}

$conn->close();

?>