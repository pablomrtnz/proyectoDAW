<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "alcassabars_bd";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Error en la conexión: " . $conn->connect_error);
}

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE user_username='$username' AND user_password='$password'";
$result = $conn->query($sql);

if (!$result) {
    die("Error en la consulta: " . $conn->error);
}

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

$conn->close();

?>