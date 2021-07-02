<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if (empty($_GET['userID'])) {
    $json = [
      'message' => 'no todos were saved.'
    ];
    $response = json_encode($json);
    echo $response;
    die();
  }


  $userID = $_GET['userID'];
  $sql = "SELECT * FROM lea6121_w12_hw2_todos WHERE userID=? ORDER BY created_at DESC";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $userID);
  $result = $stmt->execute();
  
  if(!$result) {
    $json = [
      'ok' => false, 
      'message' => 'no todos.'
    ];
    $response = json_encode($json);
    echo $response;
    die();
  }

  $result = $stmt->get_result();

  $todos = array();

  while($row = $result->fetch_assoc()){
    array_push($todos, array(
      "id" => $row['id'],
      "todos" => $row['todos'],
    ));
  }
  $json = [
    'ok' => true, 
    'todos' => $todos
  ];

  $response = json_encode($json);
  echo $response;
?>