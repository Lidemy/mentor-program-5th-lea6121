<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if(
    empty($_POST['username']) ||
    empty($_POST['password'])
    ){
      header('Location: ./login.php?errCode=1');    
      die('資料輸入不齊全');
  }

  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = "SELECT * FROM `lea6121_w9_hw1_users` WHERE `username` = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $username);
  $result = $stmt->execute();

  if(!$result){
    die($conn->error);
  }
  
  $result = $stmt->get_result();

  if ($result->num_rows == 0){
    header("Location: ./login.php?errCode=2");
    exit();
  }  

  $row = $result->fetch_assoc();

  $hash = $row['password'];

  if (password_verify($password, $hash)){
    $_SESSION['username'] = $username;
    header("Location: ./index.php");
  } else {
    header("Location: ./login.php?errCode=2");
  }

?>