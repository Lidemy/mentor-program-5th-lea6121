<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  if(!empty($_SESSION['username'])){
    $username = $_SESSION['username'];
  }

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About</title>
  <link rel="stylesheet" href="./css/reset.css">
  <link rel="stylesheet" href="./css/index.css">
</head>
<body>
  <div class="wrapper">
    
    <section>
      <a href="./index.php" id="site-name">BLOG</a>
      <nav class="tags">
        <a href="./all.php" class="tag">ALL POSTS</a>
        <a href="./about.php" class="tag">ABOUT</a>
      <?php if(!$username){ ?>
        <a href="./login.php" class="tag">LOG IN</a>
      <?php } else { ?>  
        <a href="./post.php" class="tag">WRITE A POST</a>
        <a href="./backstage.php" class="tag">BACKSTAGE</a>
        <a href="./handle_logout.php" class="tag">LOG OUT</a>
      <?php } ?> 
      </nav>
    </section>

    <h1>ABOUT ME</h1>
    <main>
      
      <div class="profile">
        
        <div class="profile_info">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ipsum velit, pharetra sit amet hendrerit quis, ultricies non purus. Ut consequat varius eros, sit amet posuere erat sodales eu. Phasellus leo nisl, consectetur vel efficitur a, convallis sed lectus. Nunc rutrum, est nec malesuada dictum, tellus lorem tincidunt ligula, at consectetur felis purus non eros. Vivamus tempor nisi lacus, sed commodo tellus ultricies vel. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin sollicitudin, metus in tempus condimentum, lorem sapien interdum dolor, ut posuere dolor lectus at diam. Suspendisse fermentum turpis quis aliquam dignissim. Morbi eu hendrerit erat, vitae imperdiet nisl. Praesent a aliquet urna, a ultrices sem. Sed in consectetur augue.
        </div>
        <div class="profile_pic"></div>
      </div>
    </main>
  </div>

  <footer>
    <p>© 2021 All Rights Reserved.</p>
  </footer>
  
</body>
</html>