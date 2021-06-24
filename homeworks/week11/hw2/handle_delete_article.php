<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");
  
  if ($username === NULL){
    header('Location: ./index.php');
    exit();
  }

  if(
    empty($_GET['id'])
    ){
      header('Location: ./index.php?errCode=1');    
      die('資料輸入不齊全');
    }
  
  $username = $_SESSION['username'];
  $id = $_GET['id'];

  $sql = "UPDATE `lea6121_w11_hw2_articles` SET is_deleted=1 WHERE id=?";

  $stmt = $conn->prepare($sql);

  $stmt->bind_param('i', $id); 
  
  $result = $stmt->execute();
  if(!$result){
    die($conn->error);
  }

  header("Location: ./backstage.php")
?>