<?php
include "../connection.php";
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");


$query = $connection->prepare("SELECT c.id, c.name, c.description, i.username, c.instructor_id FROM courses c JOIN users i on c.instructor_id = i.id WHERE i.status != 'banned'");
$query->execute();
$courses = [];
$result = $query->get_result();

while ($course = $result->fetch_assoc()) {
    $courses[] = $course;
}

echo json_encode($courses);
