<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if(
    empty($_POST['content'])
    ){
      header('Location: ./index.php?errCode=1');    
      die('資料輸入不齊全');
  }

  $username = $_SESSION['username'];
  $content = $_POST['content'];

  $sql = "INSERT INTO `lea6121_w9_hw1_comments`(username, content) VALUES(?, ?)";

  $stmt = $conn->prepare($sql);
 
  $stmt->bind_param('ss', $username, $content); 
  $result = $stmt->execute();

  if(!$result){
    die($conn->error);
  }

  header("Location: ./index.php")
?>