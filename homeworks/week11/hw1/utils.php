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

  function escape($str){
    return htmlspecialchars($str, ENT_QUOTES);
  }

  function isUser($user, $comment){
    if($user['identity'] === 'Admin'){
      return true;
    }
    
    if(($user['identity'] === 'General') || ($user['identity'] === 'Suspend') ){
      if($user['username'] === $comment['username']){
        return true;
      }
      return false;
    }
  }

  function hasPermission($user){
    if(
      ($user['identity'] === 'Admin') || 
      ($user['identity'] === 'General')){
      return true;
    }
  }

  function isAdmin($user){
    if($user['identity'] === 'Admin') {
      return true;
    }
  }
  
?>
