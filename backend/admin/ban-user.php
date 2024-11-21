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

if($payload->role != "admin"){
    http_response_code(401);
    echo json_encode(["message"=> "You are not authorized to do this"]);
    return;
}

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
        http_response_code(200);
        echo json_encode(["message" => "Banned successfully"]);
    } else {
        http_response_code(404); 
        echo json_encode(["message" => "User not found"]);
    }
} else {
    http_response_code(500); 
    echo json_encode(["message" => "Failed to ban user"]);
}
