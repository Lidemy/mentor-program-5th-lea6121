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
    <a href="./index.php">回留言板</a>
    <a href="./register.php">註冊</a>
    <h1>登入</h1>
    <?php 
      if(!empty($_GET['errCode'])){
        $code = $_GET['errCode'];
        if($code === '1'){
          $msg = '資料不齊全，請重新輸入。';
        } else if ($code === '2'){
          $msg = '帳號/密碼輸入錯誤。';
        }
        echo '<h2>錯誤：' . $msg . '</h2>';
      }
    ?>
    <form method="POST" action="./handle_login.php">
      <div>
        <span>帳號：</span>
        <input type="text" name="username" />
      </div>
      <div>
        <span>密碼：</span>
        <input type="password" name="password" />
      </div>      
      <input class="submit-btn" type="submit" />
    </form>
  </main>
</body>

</html>