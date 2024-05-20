<?php

session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$user_name = $_SESSION['user_name'];
$user_admin = $_SESSION['user_admin'];

?>


<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Area de Socios</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../style/stylebar.css">
</head>
<body>
    <div class="d-flex flex-column flex-shrink-0 p-3 sidebar" style="background-color: #6b0e24; color: white;">
        <a href="socios.php" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span class="fs-4">Panel de Socios</span>
        </a>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
                <a href="#usuarios" class="nav-link text-white">
                <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#home"/></svg>
                Usuarios
                 </a>
            </li>
            <li>
                <a href="#actas" class="nav-link text-white">
                    <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#speedometer2"/></svg>
                    Actas
                </a>
            </li>
            <li>
                <a href="#presupuestos" class="nav-link text-white">
                    <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#table"/></svg>
                    Presupuestos
                </a>
            </li>
            <li>
                <a href="#calendario" class="nav-link text-white">
                    <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#table"/></svg>
                    Calendario
                </a>
            </li>
            <li>
                <?php if ($user_admin == 1): ?>
                <a href="#secciones" class="nav-link text-white">
                    <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#table"/></svg>
                    Secciones web
                </a>
                <?php endif; ?>
            </li>
        </ul>
        <hr>
        <a href="logout.php" class="btn btn-danger">Cerrar Sesión</a>
        </button>
    </div>

    <div class="content" style="background-color: #a37b8471;">
        <div id="main-content" class="p-3" >
            <h1 style="color: #0d4a8e;">Bienvenid@</h1>
            <p style="color: #0d4a8e;">Para continuar, porfavor, selecciona una de las opciónes del menú para ver más detalles.</p>
        </div>

        <div class="modal fade" id="eventModal" tabindex="-1" aria-labelledby="eventModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="eventModalLabel">Añadir Evento</h5>
                    </div>
                    <div class="modal-body">
                        <form id="eventForm">
                            <div class="form-group">
                                <label for="eventDate">Fecha</label>
                                <input type="text" class="form-control" id="eventDate" readonly>
                            </div>
                            <div class="form-group">
                                <label for="eventDescription">Descripción</label>
                                <textarea class="form-control" id="eventDescription" rows="3"></textarea>
                            </div>
                            <button type="button" id="saveEventBtn" class="btn btn-primary">Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <script>
        const userAdmin = parseInt(<?php echo json_encode($user_admin); ?>);
        console.log('Valor de userAdmin:', userAdmin);

        const isAdmin = (userAdmin === 1);
        console.log('Valor de isAdmin:', isAdmin);
    </script>
    
    <script src="../js/script.js"></script>

</body>
</html>

