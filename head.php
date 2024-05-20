<?php

    if (isset($_GET['section'])) {
        $section_id = (int)$_GET['section'];
        $query = "SELECT section_name FROM sections WHERE section_id = $section_id";
        $result = ejecuta_consulta($query);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $title = $row['section_name'];
        }
    } elseif (isset($_GET['section_footer'])) {
        $section_id = (int)$_GET['section_footer'];
        $query = "SELECT section_footer_name FROM sections_footer WHERE section_footer_id = $section_id";
        $result = ejecuta_consulta($query);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $title = $row['section_footer_name'];
        }
    }else {
        $section_id = 1;
        $query = "SELECT section_name FROM sections WHERE section_id = $section_id";
        $result = ejecuta_consulta($query);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $title = $row['section_name'];
        }else {
            echo "No se encuentra titulo.";
        }
    }

?>

<script>

  document.addEventListener("DOMContentLoaded", function() {

    const loginButton = document.getElementById("loginBtn");

    loginButton.addEventListener("click", function() {
      window.location.href = "login.php";
    });
  });
  
</script>


<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $title; ?></title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="style/styles.css">
</head>
<body>
    <div id="cookie-banner" class="cookie-banner">
        <p>Este sitio web utiliza cookies para mejorar tu experiencia de navegación. Al hacer clic en "Aceptar", aceptas el uso de todas las cookies.</p>
        <button id="accept-cookies-btn">Aceptar</button>
    </div>