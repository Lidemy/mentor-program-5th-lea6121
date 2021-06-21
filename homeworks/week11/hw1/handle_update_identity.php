<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $id = $_POST['id'];
  $identity = $_POST['identity'];

  $sql = "UPDATE `lea6121_w9_hw1_users` SET identity=? WHERE id=?";

  $stmt = $conn->prepare($sql);

  $stmt->bind_param('si', $identity, $id); 

  $result = $stmt->execute();
  if(!$result){
    die($conn->error);
  }

  header("Location: ./backstage.php")
?>