<?php

include "../connection.php"; 
include "../jwt/secret_key.php";
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

require "../vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
$headers = getallheaders();
$jwt = $headers['Authorization'];
$key = new Key($secretKey, "HS256");
$payload = JWT::decode($jwt, $key);

if($payload->role != "instructor" && $payload->role != "admin"){
    http_response_code(401);
    echo json_encode(["message"=> "You are not authorized to do this"]);
    return;
}


$input = json_decode(file_get_contents("php://input"), true);

$course_id = $input['course_id'];
$email = $input['email'];

if (!$course_id || !$email) {
    http_response_code(400);
    echo json_encode(["message" => "course_id and email are required"]);
    exit;
}

$userQuery = $connection->prepare("SELECT id FROM users WHERE email = ? AND role = 'student' AND status = 'active'");
$userQuery->bind_param("s", $email);
$userQuery->execute();
$userResult = $userQuery->get_result();

if ($userResult->num_rows === 0) {
    http_response_code(404);
    echo json_encode(["message" => "No active student found with this email"]);
    exit;
}

$user = $userResult->fetch_assoc();
$student_id = $user['id'];

$enrollmentCheck = $connection->prepare("SELECT id FROM enrollments WHERE course_id = ? AND student_id = ?");
$enrollmentCheck->bind_param("ii", $course_id, $student_id);
$enrollmentCheck->execute();
$enrollmentResult = $enrollmentCheck->get_result();

if ($enrollmentResult->num_rows > 0) {
    http_response_code(409);
    echo json_encode(["message" => "Student is already enrolled in this course"]);
    exit;
}

$enrollQuery = $connection->prepare("INSERT INTO enrollments (course_id, student_id) VALUES (?, ?)");
$enrollQuery->bind_param("ii", $course_id, $student_id);

if ($enrollQuery->execute()) {
    http_response_code(200);
    echo json_encode(["message" => "Student enrolled successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Server error"]);
}
