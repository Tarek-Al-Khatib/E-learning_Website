<?php
include "../connection.php";
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');


$user_id = $_GET['id'];

$query = $connection->prepare("SELECT c.id, c.name, c.description, i.username as instructor_name, c.instructor_id FROM courses c JOIN users i on c.instructor_id = i.id JOIN enrollments e on c.id = e.course_id AND e.student_id = ? WHERE i.status != 'banned'");
$query->bind_param("i", $user_id);
$query->execute();
$courses = [];
$result = $query->get_result();

while ($course = $result->fetch_assoc()) {
    $courses[] = $course;
}

echo json_encode($courses);
