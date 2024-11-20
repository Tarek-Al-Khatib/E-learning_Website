<?php

include "../connection.php"; 

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

$student_id = $_GET['student_id'];
$assignment_id = $_GET['assignment_id'];

if($student_id && $assignment_id){
  $query = $connection->prepare("SELECT * FROM submissions WHERE assignment_id = ? AND student_id = ?");
  $query->bind_param("ii", $assignment_id, $student_id);
  $query->execute();
  $result = $query->get_result();
  if($result->num_rows > 0){
    echo json_encode($result->fetch_assoc());
  }else {
    echo json_encode(["value" => false]);
  }
}else {
  echo json_encode(["message" => "Student id and assignment id are required"]);
}