<?php
include "../connection.php"; 

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

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