<?php
include "../connection.php"; 

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

$input = json_decode(file_get_contents("php://input"), true);

$user_id = $input['id'];
$course_id = $input['id'];

if($user_id && $course_id){
  $query = $connection->prepare("INSERT INTO enrollments(course_id, student_id) VALUES( ?, ?");
  $query->bind_param("ii", $course_id, $user_id);
  if($query->execute()){
    http_response_code(response_code: 200);
    echo json_encode(["message" => "Enrolled successfuly"]);
  }else {
    http_response_code(response_code: 500);
    echo json_encode(["message" => "Bad request, server error"]);
  }
}else {
  http_response_code(400);
  echo json_encode(["message" => "User id and course id are required"]);
}
