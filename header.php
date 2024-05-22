<header class="p-3 text-white" style="background-color: #0d4a8e;">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li>
            <a href="https://www.facebook.com/filamora.alcassabarsdalaquas" class="nav-link px-2 text-white">
            <img src="img/rrss/facebook.png" alt="Facebook" style="width: 30px; height: 30px; margin-right: 5px;">
            </a>
          </li>
          <li>
            <a href="https://twitter.com/alcassabars" class="nav-link px-2 text-white">
            <img src="img/rrss/twitter.png" alt="Twitter" style="width: 30px; height: 30px; margin-right: 5px;">
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/filaalcassabars" class="nav-link px-2 text-white">
            <img src="img/rrss/instagram.png" alt="Instagram" style="width: 30px; height: 30px; margin-right: 5px;">
            </a>
          </li>
        </ul>

        <div class="text-end">
            <button id="loginBtn" type="button" class="btn btn-outline-light me-2">Login</button>
        </div>
      
      </div>
    </div>
</header>

<div class="d-flex justify-content-center py-3" style="background-color: #851e36; color: white;">
    <h2>Filà Mora Alcassabars</h2>
</div>

<div class="container-fluid" style="background-color: #eedb9a; padding: 0;">
    <header class="d-flex justify-content-center py-3">
        <ul class="nav nav-pills">
            <?php
            
            $query = "SELECT * FROM sections WHERE section_show_in_menu = 1";
            $result = ejecuta_consulta($query);

            while ($row = $result->fetch_assoc()) {
                $sectionName = htmlspecialchars($row['section_name']);
                $sectionId = $row['section_id'];
                echo '<li class="nav-item"><a href="index.php?section=' . $sectionId . '" class="nav-link">' . $sectionName . '</a></li>';
            }

            ?>
        </ul>
    </header>
</div>
