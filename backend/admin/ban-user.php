<?php
include "../connection.php"; 

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

$input = json_decode(file_get_contents("php://input"), true);

$userId = $input['userId'] ?? null;

$query = $connection->prepare("UPDATE users SET status = 'banned' WHERE id = ?");
$query->bind_param("i", $userId);

if($query->execute()){
  echo json_encode(["message"=> "Banned successfully"]);
}
