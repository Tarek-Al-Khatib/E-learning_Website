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
}


$input = json_decode(file_get_contents("php://input"), true);

$username = $input['username'] ?? null;
$password = $input['password'] ?? null;
$email = $input['email'] ?? null;


if ($username && $password && $email) {
  $checkUserQuery = $connection->prepare("SELECT * FROM users WHERE username = ? OR email = ?");
  if ($checkUserQuery) {
      $checkUserQuery->bind_param("ss", $username, $email);
      $checkUserQuery->execute();
      $result = $checkUserQuery->get_result();

      if ($result->num_rows > 0) {
          echo json_encode(["status" => "error", "message" => "Username/Email already taken"]);
      } else {
          $hashedPassword = password_hash($password, PASSWORD_DEFAULT); 

          $query = $connection->prepare("INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, 'instructor')");
          if ($query) {
              $query->bind_param("sss", $username, $hashedPassword, $email);
              
              if ($query->execute()) {
                  http_response_code(200);
                  echo json_encode(["status" => "success", "message" => "User registered successfully"]);
              } else {
                  echo json_encode(["status" => "error", "message" => "Failed to register user"]);
              }
          } else {
              echo json_encode(["status" => "error", "message" => "Database error during user creation"]);
          }
      }
  } else {
      echo json_encode(["status" => "error", "message" => "Database error during user validation"]);
  }
} else {
  echo json_encode(["status" => "error", "message" => "Username, password and email are required"]);
}