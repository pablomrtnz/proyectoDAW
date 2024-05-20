<?php

$host = "localhost";
$username = "root";
$password = "";
$dbname = "alcassabars_bd";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $selectedYear = $_GET['año'];

    $query = "SELECT n.id_nivel, n.desc_nivel, t.desc_tipo, lp.importe
              FROM presupuesto p
              JOIN linea_presupuesto lp ON p.id_presupuesto = lp.id_presupuesto
              JOIN nivel n ON n.id_nivel = lp.id_nivel
              JOIN tipo t ON n.id_tipo = t.id_tipo
              WHERE p.año = :selectedYear";
    
    $statement = $pdo->prepare($query);
    $statement->execute(array(':selectedYear' => $selectedYear));
    
    $lineas = $statement->fetchAll(PDO::FETCH_ASSOC);
    
    header('Content-Type: application/json');
    echo json_encode($lineas);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al obtener líneas presupuestarias: ' . $e->getMessage()]);
}

?>