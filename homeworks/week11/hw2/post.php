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
  
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Write a Post</title>
  <link rel="stylesheet" href="./css/reset.css">
  <link rel="stylesheet" href="./css/post.css">
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

    <h1>WRITE A POST</h1>

    <main>
      <form method="POST" action="./handle_post.php">
      <?php 
        if(!empty($_GET['errCode'])){
          $code = $_GET['errCode'];
          if($code === '1'){
            $msg = '資料不齊全，請重新輸入。';
            echo '<h2>' . $msg . '</h2>';
          }
        }
      ?>
        <div class="form__editor">
          <div class="form__title">
            <input type="text" name="title" placeholder="Enter the title here..." required>
            <input type="text" name="img_url" placeholder="Enter the main image url...">
          </div>
          <div>
            <textarea name="editor" id="form__text-editor"></textarea>
            <script type="text/javascript" src="https://cdn.ckeditor.com/4.7.3/standard/ckeditor.js"></script>
            <script type="text/javascript">CKEDITOR.replace('editor');</script>
          </div>
        </div>
        <div class="form__submit">
          <input type="submit" value="SUBMIT" class="submit__btn">
        </div>
      </form>
    </main>
  </div>

  <footer>
    <p>© 2021 All Rights Reserved.</p>
  </footer>

</body>

</html>