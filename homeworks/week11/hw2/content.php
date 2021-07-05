<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  $id = $_GET['id'];

  if(!empty($_SESSION['username'])){
    $username = $_SESSION['username'];
  }

  $stmt = $conn->prepare("SELECT * FROM `lea6121_w11_hw2_articles` WHERE id=?");
  $stmt->bind_param("i", $id);
  $result = $stmt->execute();

 
  if(!$result){
    die('Error:' . $conn->error);
  }

  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo escape($row['title']) ?></title>
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

    <h1 class="article_title"><?php echo escape($row['title']) ?></h1>
    
    <main>
      
      <div class="article">
        <div class="article_text">
          <?php echo escape($row['content'])?>
        </div>
        <div class="article_pic">
          <img src="<?php echo escape($row['img_url']) ?>">
        </div>
      </div>

    </main>
  </div>
  <footer>
    <p>© 2021 All Rights Reserved.</p>
  </footer>
</body>
</html>