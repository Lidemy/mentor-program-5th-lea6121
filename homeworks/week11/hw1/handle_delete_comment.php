<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if ($username === NULL){
    header('Location: ./index.php');
  }

  if(
    empty($_GET['id'])
    ){
      header('Location: ./index.php?errCode=1');    
      die('資料輸入不齊全');
  }

  $username = $_SESSION['username'];
  $id = $_GET['id'];
  $username = $_POST['username'];
  $user = getUserFromUsername($username);


  $sql = "UPDATE `lea6121_w9_hw1_comments` SET is_deleted=1 WHERE id=? AND username=?";

  if(isAdmin($user)){
    $sql = "UPDATE `lea6121_w9_hw1_comments` SET is_deleted=1 WHERE id=?";
  }

  $stmt = $conn->prepare($sql);

  if(isAdmin($user)){
    $stmt->bind_param('i', $id);
  } else {
    $stmt->bind_param('is', $id, $username); 
  }
  
  $result = $stmt->execute();
  if(!$result){
    die($conn->error);
  }

  header("Location: ./index.php")
?>