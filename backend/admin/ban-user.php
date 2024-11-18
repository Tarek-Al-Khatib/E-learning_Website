<?php
include "../connection.php"; 

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

$input = json_decode(file_get_contents("php://input"), true);

$userId = $input['userId'] ?? null;

if (!$userId || !is_numeric($userId)) {
    http_response_code(400);
    echo json_encode(["message" => "Invalid or missing userId"]);
    exit;
}

$query = $connection->prepare("UPDATE users SET status = 'banned' WHERE id = ?");
$query->bind_param("i", $userId);

if ($query->execute()) {
    if ($query->affected_rows > 0) {
        echo json_encode(["message" => "Banned successfully"]);
    } else {
        http_response_code(404); 
        echo json_encode(["message" => "User not found"]);
    }
} else {
    http_response_code(500); 
    echo json_encode(["message" => "Failed to ban user"]);
}
