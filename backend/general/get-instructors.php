<?php
include "../connection.php";
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");

$query = $connection->prepare("SELECT * FROM users WHERE role = 'instructor'");
$query->execute();
$instructors = [];
$result = $query->get_result();

while ($instructor = $result->fetch_assoc()) {
    $instructors[] = $instructor;
}

echo json_encode($instructors);
