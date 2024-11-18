<?php
include "../connection.php"; 

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

$input = json_decode(file_get_contents("php://input"), true);

$description = $input['description'];
$instructor_id = $input['instructor_id'];
$name = $input['name'];
$course_id = $input['course_id'];


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