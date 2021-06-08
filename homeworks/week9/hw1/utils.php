<?php
  require_once("conn.php");

  function getUserFromUsername($username){
    global $conn;
    $sql = sprintf(
      "SELECT * FROM `lea6121_w9_hw1_users` WHERE username = '%s'",
      $username
    );
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    return $row;
  } 
?>
