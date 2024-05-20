<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<script src="js/cookies.js"></script>
</body>

<div class="footer">
    <footer class="py-3">
      <ul class="nav justify-content-center border-bottom pb-3 mb-3 border-black">
      <?php

            $query = "SELECT * FROM sections_footer WHERE section_footer_show_in_menu = 1";
            $result = ejecuta_consulta($query);

            while ($row = $result->fetch_assoc()) {
                $sectionName = htmlspecialchars($row['section_footer_name']);
                $sectionId = $row['section_footer_id'];                    
                echo '<li class="nav-item"><a href="index.php?section_footer=' . $sectionId . '" class="nav-link px-2 text-body-secondary">' . $sectionName . '</a></li>';
            }
            
        ?>
     </ul>
     <p class="text-center text-body-secondary">Filà Mora Alcassabars | &copy; 2024</p>

    </footer>
  </div>

</html>
