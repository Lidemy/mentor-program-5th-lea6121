<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  $user = NULL;


  if(!empty($_SESSION['username'])){
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }

  $page = 1;
  if (!empty($_GET['page'])){
    $page = intval($_GET['page']);
  }

  $item_per_page = 10;
  $offset = ($page - 1) * $item_per_page;

  $stmt = $conn->prepare(
    "SELECT C.id AS id, 
    C.content AS content, 
    C.created_at AS created_at, 
    U.username AS username, 
    U.identity AS identity, 
    U.nickname AS nickname FROM `lea6121_w9_hw1_comments` AS C LEFT JOIN `lea6121_w9_hw1_users` AS U ON C.username = U.username WHERE C.is_deleted IS NULL ORDER BY C.id DESC LIMIT ? OFFSET ?");
  
  $stmt->bind_param('ii', $item_per_page, $offset);
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
      <span class="update-nickname">編輯暱稱</span>

      <?php if($username && isAdmin($user)){ ?>
        <a href="./backstage.php">後台管理</a>
      <?php } ?>

      <form class="hide update-nickname-form" method="POST" action="./update_user.php">
        <div>
          <span>更改暱稱：</span>
          <input type="text" name="nickname" />        
        </div>
        <input class="submit-btn" type="submit" />
      </form>
      <h3>您好！<?php 
        echo escape($row['nickname']);
      ?></h3>
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

    <?php if($username && hasPermission($user)) { ?>
      
      <form method="POST" action="./handle_add_comment.php">
        <textarea name=content rows="5" placeholder="想說些什麼呢？"></textarea>
        <input class="submit-btn" type="submit" />
      </form>

    <?php } else if (!$username) { ?>
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
              <span class="card__author">
                <?php echo escape($row['username']); ?>
                @<?php echo escape($row['nickname']); ?>
              </span>
              <span class="card__post-time"><?php echo escape($row['created_at']) ?></span>
              <?php if (isUser($user, $row)){ ?>
                <a href="./update_comment.php?id=<?php echo escape($row['id']) ?>">編輯</a>
                <a href="./handle_delete_comment.php?id=<?php echo escape($row['id']) ?>">刪除</a>
              <?php } ?>         
            </div>
            <p class="card__content"><?php echo escape($row['content']) ?></p>
          </div>
        </div>
      <?php } ?>           
    </section>

    <hr />

    <?php 
      $stmt = $conn->prepare("SELECT count(id) AS count FROM `lea6121_w9_hw1_comments` WHERE is_deleted IS NULL");

      $result = $stmt->execute();
      $result = $stmt->get_result();
      $row = $result ->fetch_assoc();
      $count = $row['count'];
      $total_page = ceil($count / $item_per_page);
    ?>

    <div class="page-info">
      <span>總共有 <?php echo $count ?> 筆留言，頁數：</span>
      <span><?php echo $page ?> / <?php echo $total_page ?></span>
      分頁
    </div>
    <div class="paginator">
      <?php if($page !== 1){ ?>
        <a href="./index.php?page=1">首頁</a>
      <?php } ?>
      <?php if($page - 1 >= 1){ ?>
        <a href="./index.php?page=<?php echo $page - 1 ?>">上一頁</a>
      <?php } ?>
      <?php if($page < $total_page){ ?>
        <a href="./index.php?page=<?php echo $page + 1 ?>">下一頁</a>
      <?php }?>
      <?php if($page != $total_page){ ?>      
        <a href="./index.php?page=<?php echo $total_page ?>">最後頁</a>
      <?php } ?>
    </div>
  </main>

  <script>
    const btn = document.querySelector('.update-nickname');

    btn.addEventListener('click', () => {
      document.querySelector('.update-nickname-form').classList.toggle('hide');
    });
  </script>
</body>

</html>