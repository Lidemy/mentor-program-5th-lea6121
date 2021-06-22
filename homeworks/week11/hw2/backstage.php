<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;

  if(!empty($_SESSION['username'])){
    $username = $_SESSION['username'];
  }

  if ($username === NULL){
    header('Location: ./index.php');
  }

  $stmt = $conn->prepare(
    "SELECT * FROM `lea6121_w11_hw2_articles` WHERE is_deleted IS NULL ORDER BY created_at DESC");
  
  $result = $stmt->execute();
  
  if(!$result){
    die('Error:' . $conn->error);
  }

  $result = $stmt->get_result();
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Write a Post</title>
  <link rel="stylesheet" href="./css/reset.css">
  <link rel="stylesheet" href="./css/backstage.css">
  <link rel="stylesheet" href="//use.fontawesome.com/releases/v5.0.7/css/all.css">  
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

    <h1>BACKSTAGE</h1>

    <main>
      <div class="posts">
        <?php 
          while($row = $result->fetch_assoc()) {
        ?>
          <div class="post">
            <div class="post_block">
              <div class="post_author"><?php echo escape($row['username']) ?><span class="post_date"><?php echo escape($row['created_at']) ?></span></div>
            
              <?php if($username){ ?>
                <div class=post_icons>
                  <a href="./edit_article.php?id=<?php echo escape($row['id']) ?>"><i class="fas fa-edit"></i></a>
                  <a href="./handle_delete_article.php?id=<?php echo escape($row['id']) ?>"><i class="fas fa-trash-alt"></i></a>            
                </div>
              <?php } ?>
            </div>  
            
            <div class="post_title"><?php echo escape($row['title']) ?></div>
            <div class="post_content"><?php echo ($row['content']) ?></div>
          </div>
        <?php } ?>
      </div>
    </main>
  <footer>
    <p>© 2021 All Rights Reserved.</p>
  </footer>
</body>

</html>