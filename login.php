<?php

    include ("top.php");
    include ("head.php"); 
    include ("header.php"); 
?>

<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-6 mt-5 mb-5">
            <div class="rounded p-4 border shadow-sm">
                <h2 class="text-center mb-4">Acceso miembros</h2> 

                <form action="top_login.php" method="post">

                    <div class="mb-3">
                        <label for="username" class="form-label">Usuario:</label>
                        <input type="text" class="form-control custom-input" id="username" name="username">
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">Contraseña:</label>
                        <input type="password" class="form-control custom-input" id="password" name="password">
                    </div>

                    <div class="d-grid gap-2">
                        <input type="submit" class="btn btn-primary custom-btn" value="Iniciar sesión">
                    </div>

                </form>
            </div>
        </div>
    </div>
</div>

<?php
    include ("footer.php");
?>