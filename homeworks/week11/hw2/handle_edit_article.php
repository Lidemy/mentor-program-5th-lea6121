<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if(
    empty(($_POST['editor'])) || empty($_POST['title']))
    {
      header('Location: ./edit_article.php?errCode=1&id=' . $_POST['id']);    
      die('資料輸入不齊全');
    }


  if(empty($_POST['img_url'])){
    $_POST['img_url'] = 'https://images.unsplash.com/photo-1623183074739-1ba7a5ba0002?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE1Mnw2c01WalRMU2tlUXx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60';
  }

  $username = $_SESSION['username'];
  $id = $_POST['id'];
  $title = $_POST['title'];
  $img_url= $_POST['img_url'];
  $content = $_POST['editor'];

  $sql = "UPDATE `lea6121_w11_hw2_articles` SET title=?, img_url=?, content=? WHERE id=?";

  $stmt = $conn->prepare($sql);

  $stmt->bind_param('sssi', $title, $img_url, $content, $id); 

  $result = $stmt->execute();
  if(!$result){
    die($conn->error);
  }

  header("Location: ./index.php")
?>