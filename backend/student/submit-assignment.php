<?php
include "../connection.php"; 

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

$input = json_decode(file_get_contents("php://input"), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid JSON input"]);
    exit;
}

$assignment_id = $input['assignment_id'];
$student_id = $input['student_id'];
$file_path = $input['file_path'];

if (!$assignment_id || !$student_id || !$file_path) {
    http_response_code(400);
    echo json_encode(["message" => "assignment_id, student_id, and file_path are required"]);
    exit;
}

$query = $connection->prepare(
    "INSERT INTO submissions (assignment_id, student_id, file_path) VALUES (?, ?, ?)"
);
$query->bind_param("iis", $assignment_id, $student_id, $file_path);

if ($query->execute()) {
    http_response_code(200);
    echo json_encode(["message" => "Submission added successfully", "submission_id" => $connection->insert_id]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Server error"]);
}
