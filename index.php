<?php

    include ("top.php");
    include ("head.php"); 
    include ("header.php"); 

    
    if (isset($_GET['section'])) {

        $query = "SELECT * FROM sections WHERE section_id = $section_id";
        $result = ejecuta_consulta($query);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            muestra_contenido($row['section_content_html']);
        } else {
            echo "No se encontró la sección especificada.";
        }
    
    } elseif (isset($_GET['section_footer'])) {

        $query = "SELECT * FROM sections_footer WHERE section_footer_id = $section_id";
        $result = ejecuta_consulta($query);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            muestra_contenido($row['section_footer_content_html']);
        } else {
            echo "No se encontró la sección del footer especificada.";
        }
    
    } else {

        $section_id = 1;
        $query = "SELECT * FROM sections WHERE section_id = $section_id";
        $result = ejecuta_consulta($query);
        
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            muestra_contenido($row['section_content_html']);

        }else {
            echo "Por favor, proporciona una sección válida.";
        }

    }

    function muestra_contenido($content) {
        echo $content;
    }

    include ("footer.php");

?>