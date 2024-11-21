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

$title = $input['title'];
$description = $input['description'];
$due_date = $input['due_date'];
$course_id = $input['course_id'];

if (!$title || !$description || !$due_date || !$course_id) {
    http_response_code(400);
    echo json_encode(["message" => "All fields are required"]);
    exit;
}

$query = $connection->prepare("INSERT INTO assignments (title, description, due_date, course_id) VALUES (?, ?, ?, ?)");
$query->bind_param("sssi", $title, $description, $due_date, $course_id);

if ($query->execute()) {
    http_response_code(200);
    echo json_encode(["message" => "Assignment created successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Server error"]);
}