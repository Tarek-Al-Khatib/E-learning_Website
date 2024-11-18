<?php
include "../connection.php";
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");

$query = $connection->prepare("SELECT * FROM users WHERE role = 'student'");
$query->execute();
$students = [];
$result = $query->get_result();

while ($student = $result->fetch_assoc()) {
    $students[] = $student;
}

echo json_encode($students);
