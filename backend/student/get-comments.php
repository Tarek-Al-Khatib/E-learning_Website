<?php
include "../connection.php";
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");

$assignment_id = $_GET['assignment_id'];

if($assignment_id) {
  $query = $connection->prepare("SELECT c.*, u.username, u.role FROM comments c 
  JOIN assignments a on c.assignment_id = a.id
  JOIN users u on c.user_id = u.id
  WHERE a.id = ?");
  $query->bind_param("i", $assignment_id);
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
