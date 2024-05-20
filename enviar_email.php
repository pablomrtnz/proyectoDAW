<?php

function sanitize_input($data) {
    return htmlspecialchars(stripslashes(trim($data)));
}

$nombre = sanitize_input($_POST['nombre']);
$email = sanitize_input($_POST['email']);
$asunto = sanitize_input($_POST['asunto']);
$mensaje = sanitize_input($_POST['mensaje']);

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response = array(
        'status' => 'error',
        'message' => 'El correo electrónico no es válido.'
    );
    header('Content-Type: application/json');
    echo json_encode($response);
    exit();
}

$nombre = str_replace(array("\r", "\n"), '', $nombre);
$email = str_replace(array("\r", "\n"), '', $email);
$asunto = str_replace(array("\r", "\n"), '', $asunto);

$destinatario = 'pablo.mrtz@gmail.com'; 

$contenido = "Nombre: $nombre\n";
$contenido .= "Correo Electrónico: $email\n";
$contenido .= "Asunto: $asunto\n";
$contenido .= "Mensaje:\n$mensaje\n";

$headers = "From: $nombre <$email>";

if (mail($destinatario, $asunto, $contenido, $headers)) {
    $response = array(
        'status' => 'success',
        'message' => '¡El mensaje ha sido enviado!'
    );
} else {
    $response = array(
        'status' => 'error',
        'message' => 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.'
    );
}

header('Content-Type: application/json');
echo json_encode($response);

?>