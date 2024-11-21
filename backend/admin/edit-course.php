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

$description = $input['description'];
$instructor_id = $input['instructor_id'];
$name = $input['name'];
$course_id = $input['id'];


if($description && $instructor_id && $name && $course_id) {
  $query = $connection->prepare("UPDATE courses SET name = ?, description = ?, instructor_id = ? WHERE id = ?");
  $query->bind_param("ssii", $name, $description, $instructor_id, $course_id);

  if($query->execute()){
    echo json_encode(["message"=> "Edited the course successfuly"]);
  }else {
    echo json_encode(["message"=> "Failed to edit course"]);
  }
}else{ 
  echo json_encode(["message"=> "The parameters are not received"]);
}