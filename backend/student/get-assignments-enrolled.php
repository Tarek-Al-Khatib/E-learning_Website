<?php
include "../connection.php";
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");

$user_id = $_GET['student_id'];

if($user_id) {
  $query = $connection->prepare("SELECT  a.*, c.name as course_name FROM assignments a 
  JOIN courses c on c.id = a.course_id 
  JOIN enrollments e on e.course_id = c.id
  JOIN users s on s.id = e.student_id WHERE s.id = ?");
  $query->bind_param("i", $user_id);
  $query->execute();
  $courses = [];
  $result = $query->get_result();

  while ($course = $result->fetch_assoc()) {
      $courses[] = $course;
  }

  echo json_encode($courses);
}else {
  echo json_encode(["message"=> "student id is required"]);
}
