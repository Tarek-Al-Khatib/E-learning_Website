<?php
include "../connection.php"; 

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

$input = json_decode(file_get_contents("php://input"), true);

$course_id = $input['course_id'];


if($ $course_id) {
  $query = $connection->prepare("DELETE FROM courses WHERE id = ?");
  $query->bind_param("i", $course_id);

  if($query->execute()){
    echo json_encode(["message"=> "Removed the course successfuly"]);
  }else {
    echo json_encode(["message"=> "Failed to remove course"]);
  }
}else{ 
  echo json_encode(["message"=> "The parameters are not received"]);
}