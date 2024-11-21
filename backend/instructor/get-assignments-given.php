<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

$input = json_decode( file_get_contents("php://input"), true);

$instructor_id = $input['instructor_id'];


if($instructor_id){
  $query = $connection->prepare("SELECT a.*, c.name as course_name FROM users u JOIN courses c on u.id = c.instructor_id 
  JOIN assignments a on c.id  = a.course_id WHERE u.id = ?");
  $query->bind_param("i" , $instructor_id);
  $query->execute();
  $result = $query->get_result();
  $assignments = [];
  if($result->num_rows > 0){
    while($assignment = $result->fetch_assoc()){
      $assignments[] = $assignment;
    }

    echo json_encode($assignments);
  }else {
    echo json_encode(["message"=> "There are no assignments", "value" => false]);
  }
}else{
  echo json_encode(["message"=> "Instructor id is required"]);
}
