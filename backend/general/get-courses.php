<?php
include "../connection.php";
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");

$query = $connection->prepare("SELECT * FROM courses");
$query->execute();
$courses = [];
$result = $query->get_result();

while ($course = $result->fetch_assoc()) {
    $courses[] = $course;
}

echo json_encode($courses);
