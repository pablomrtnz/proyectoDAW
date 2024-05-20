<?php

$nombre = $_POST['nombre'];
$email = $_POST['email'];
$asunto = $_POST['asunto'];
$mensaje = $_POST['mensaje'];

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