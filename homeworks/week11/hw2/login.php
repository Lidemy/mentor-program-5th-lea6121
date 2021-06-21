<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Log In</title>
  <link rel="stylesheet" href="./css/reset.css">
  <link rel="stylesheet" href="./css/login.css">
</head>
<body>
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

  <div class="wrapper">
    <main>
      <h1>LOG IN</h1>

      <form method="POST" action="./handle_login.php">
        <div>USERNAME<br><input type="text" name="username"></div>
        <div>PASSWORD<br><input type="password" name="password"></div>
        <?php 
        if(!empty($_GET['errCode'])){
          $code = $_GET['errCode'];
          if($code === '1'){
            $msg = '資料不齊全，請重新輸入。';
          } else if ($code === '2'){
            $msg = '帳號/密碼輸入錯誤。';
          }
          echo '<h2>' . $msg . '</h2>';
        }
        ?>
        <div><input type="submit" value="SIGN IN"  class="submit"></div>
      </form> 
    </main>
  </div>
</body>
</html>