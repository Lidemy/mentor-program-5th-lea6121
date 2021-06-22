<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  $user = NULL;
  $id = $_GET['id'];

  if(!empty($_SESSION['username'])){
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }

  if ($username === NULL){
    header('Location: ./index.php');
  }
  
  $stmt = $conn->prepare(
    "SELECT * FROM `lea6121_w9_hw1_comments` WHERE id = ?");
    
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
  <title>留言板</title>
  <link rel="stylesheet" href="./index.css">
</head>

<body>
  <header>
    <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
  </header>
  <main>

    <h1>編輯留言</h1>
    
    <?php 
      if(!empty($_GET['errCode'])){
        $code = $_GET['errCode'];
        if($code === '1'){
          $msg = '資料不齊全，請重新輸入。';
          echo '<h2>' . $msg . '</h2>';
        }
      }
    ?>

    <form method="POST" action="./handle_update_comment.php">
      <textarea name=content rows="5" placeholder="想說些什麼呢？"><?php echo escape($row['content'])?>
      </textarea>
      <input type="hidden" name="id" value="<?php echo escape($row['id']) ?>" />
      <input class="submit-btn" type="submit" />
    </form>
    <hr />
    
  </main>
</body>

</html>