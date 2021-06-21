<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if(
    empty($_POST['username']) ||
    empty($_POST['password'])
    ){
      header('Location: login.php?errCode=1');    
      die('資料輸入不齊全');
  }

  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = "SELECT * FROM `lea6121_w11_hw2_users` WHERE username = ? and password = ?";

  $stmt = $conn->prepare($sql);
    
  $stmt->bind_param('ss', $username, $password); 

  $result = $stmt->execute();
    
  $result = $stmt->get_result();

  if(!$result){
    die($conn->error);
  }

  if ($result->num_rows){
    $_SESSION['username'] = $username;
    header("Location: ./index.php");
  } else {
    header("Location: ./login.php?errCode=2");
  }
?>