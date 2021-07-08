<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if (empty($_POST['todos'])) {
    $json = [
      'ok' => false, 
      'message' => 'no todos.'
    ];
    $response = json_encode($json);
    echo $response;
    die();
  } 
   
  $todos = $_POST['todos'];
  $userID = $_POST['userID'];

  $sql = "INSERT INTO lea6121_w12_hw2_todos (userID, todos) VALUES (?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $userID, $todos);
 
  $result = $stmt->execute();

  if(!$result){
    $json = array(
    "ok" => false,
    "message" => $conn->error
  );
  $response = json_encode($json);
  echo $response;
  die();
  }

  $json = array(
    "ok" => true,
    "message" => "success"
  );

  $response = json_encode($json);
  echo $response;
?>