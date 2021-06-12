<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  if(!empty($_SESSION['username'])){
    $username = $_SESSION['username'];
  }

  $result = $conn->query("SELECT * FROM `lea6121_w9_hw1_comments` ORDER BY id desc");
  if(!$result){
    die('Error:' . $conn->error);
  }

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>留言板</title>
  <link rel="stylesheet" href="./index.css">
</head>

<body>
  <header>
    <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
  </header>
  <main>
    <?php if(!$username){ ?>
      <a href="./register.php">註冊</a>
      <a href="./login.php">登入</a>
    <?php } else { ?>
      <a href="./logout.php">登出</a>
      <h3>您好！<?php echo $username; ?></h3>
    <?php } ?>
    <h1>Comments</h1>
    
    <?php 
      if(!empty($_GET['errCode'])){
        $code = $_GET['errCode'];
        if($code === '1'){
          $msg = '資料不齊全，請重新輸入。';
          echo '<h2>' . $msg . '</h2>';
        }
      }
    ?>

    <?php if($username) {?>
    <form method="POST" action="handle_add_comment.php">
      <textarea name=content rows="5" placeholder="想說些什麼呢？"></textarea>
      <input class="submit-btn" type="submit" />
    </form>
    <?php } else { ?>
      <h3>請登入發布留言</h3>
    <?php } ?>  
    <hr />
    <section>
      <?php 
        while($row = $result->fetch_assoc()) {  
      ?>
        <div class="card">
          <div class="card__avatar"></div>
          <div class="card__body">
            <div class="card__info">
              <span class="card__arthur"><?php echo $row['nickname'] ?></span>
              <span class="card__post-time"><?php echo $row['created_at'] ?></span>
            </div>
            <p class="card__content"><?php echo $row['content']?></p>
          </div>
        </div>
      <?php  } ?>           
    </section>
  </main>
</body>

</html>