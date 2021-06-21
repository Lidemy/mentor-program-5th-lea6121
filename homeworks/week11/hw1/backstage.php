<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  $id = $_GET['id'];


  if(!empty($_SESSION['username'])){
    $username = $_SESSION['username'];
  }

  $stmt = $conn->prepare(
    "SELECT `id`, `username`, `nickname`, `identity` FROM `lea6121_w9_hw1_users` ORDER BY id");

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
  <link rel="stylesheet" href="./backstage.css">
</head>

<body>
  <header>
    <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
  </header>
  <main>
      <div><a href="./index.php">回首頁</a></div>
      <table>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Nickname</th>
          <th>Identity</th>
          <th>Change Identity</th>
        </tr>

        <?php 
          while($row = $result->fetch_assoc()) {
        ?>
          <tr>
            <td><?php echo escape($row['id']); ?></td>
            <td><?php echo escape($row['username']); ?></td>

            <td><?php echo escape($row['nickname']); ?></td>
            <td>
             <?php echo escape($row['identity']); ?>
            </td>
            <td>
              <form name="identity" method="POST" action="./handle_update_identity.php">
                <select name="identity">                  
                  <option value="General">General</option>
                  <option value="Admin">Admin</option>
                  <option value="Suspend">Suspend</option>                  
                </select>
                <input class="submit-btn" type="submit" />
                <input type="hidden" name="id" value="<?php echo $row['id'] ?>" />
              </form>    
            </td>  
          </tr>
        <?php } ?>
      </table>      

    </main>

</body>

</html>