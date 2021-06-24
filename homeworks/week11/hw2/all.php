<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  if(!empty($_SESSION['username'])){
    $username = $_SESSION['username'];
  }


  $item_per_page = 9;
  $stmt = $conn->prepare(
    "SELECT * FROM `lea6121_w11_hw2_articles` WHERE is_deleted IS NULL ORDER BY created_at DESC LIMIT ?");
  
  $stmt->bind_param('i', $item_per_page);
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
  <title>My Blog</title>
  <link rel="stylesheet" href="./css/reset.css">
  <link rel="stylesheet" href="./css/index.css">
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
  <h1>ALL POSTS</h1>
  <main>
    <div class="posts">
      <?php 
        while($row = $result->fetch_assoc()) {
      ?>
        <div class="post">
        <div class="post_photo">
        <a href="./content.php?id=<?php echo escape($row['id']) ?>">
          <img  src="<?php echo escape($row['img_url']) ?>">
        </a>
        </div>
          <div class="post_author"><?php echo escape($row['username']) ?></div>
          <div class="post_date"><?php echo escape($row['created_at']) ?></div>
          <div class="post_title"><?php echo escape($row['title']) ?></div>
          <div class="post_content"><?php echo ($row['content']) ?></div>
          <div class="post_select">
            <a href="./content.php?id=<?php echo escape($row['id']) ?>">Read More...</a>
            <?php if($username){ ?>
              <div class=post_icons>
                <a href="./edit_article.php?id=<?php echo $row['id'] ?>"><i class="fas fa-edit"></i></a>
                <a href="./handle_delete_article.php?id=<?php echo $row['id'] ?>"><i class="fas fa-trash-alt"></i></a>            
              </div>
            <?php } ?>
          </div>
        </div>
      <?php } ?>
    </div>
  </main>
</div>
<footer>
  <p>© 2021 All Rights Reserved.</p>
</footer>
</body>

</html>