<?php
include "../connection.php"; 

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

$input = json_decode(file_get_contents("php://input"), true);

$assignment_id = $input['assignment_id'];
$user_id = $input['user_id'];
$content = $input['content'];
$is_private = $input['is_private'];

if ($assignment_id && $user_id && $content) {
  $query = $connection->prepare("INSERT INTO comments (assignment_id, user_id, content, is_private) VALUES (?, ?, ?, ?)");
  $query->bind_param("iisi", $assignment_id, $user_id, $content, $is_private);

  if ($query->execute()) {
      http_response_code(201); // Resource created
      echo json_encode(["message" => "Comment added successfully", "comment_id" => $connection->insert_id]);
  } else {
      http_response_code(500);
      echo json_encode(["message" => "Server error: " . $query->error]);
  }
}else {
  echo json_encode(["message" => "Parameters are required"]);
}


