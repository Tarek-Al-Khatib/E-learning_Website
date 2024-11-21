<?php
include "../connection.php"; 
include "../jwt/secret_key.php";
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

require "../vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
$headers = getallheaders();
$jwt = $headers['Authorization'];

$key = new Key($secretKey, "HS256");
$payload = JWT::decode($jwt, $key);

if($payload->role != "admin"){
    http_response_code(401);
    echo json_encode(["message"=> "You are not authorized to do this"]);
}

$input = json_decode(file_get_contents("php://input"), true);

$description = $input['description'] ?? null;
$instructor_id = $input['instructor_id'] ?? null;
$name = $input['name'] ?? null;


if($description && $instructor_id && $name) {
  $query = $connection->prepare("INSERT INTO courses (name, description, instructor_id) VALUES(?, ?, ?)");
  $query->bind_param("ssi", $name, $description, $instructor_id);

  if($query->execute()){
    echo json_encode(["message"=> "Added the course successfuly"]);
  }else {
    echo json_encode(["message"=> "Failed to add course"]);
  }
}else{ 
  echo json_encode(["message"=> "The parameters are not received"]);
}