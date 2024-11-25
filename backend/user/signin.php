<?php
include "../connection.php"; 
include "../jwt/secret_key.php";

require "../vendor/autoload.php";

use Firebase\JWT\JWT;

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");
header('Content-Type: application/json');

$input = json_decode(file_get_contents("php://input"), true);

$username = $input['username'] ?? null;
$password = $input['password'] ?? null;

if ($username && $password) {
    $query = $connection->prepare("SELECT * FROM users WHERE username = ?");
    if ($query) {
        $query->bind_param("s", $username);
        $query->execute();
        $result = $query->get_result();

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            if($user['status'] != 'active') {
                echo json_encode(["status" => "error", "message" => "You are banned"]);
                return;
            }

            if (password_verify($password, $user['password'])) {
                $payload = [
                    "user_id" => $user['id'],
                    "role" => $user['role'],
                    "status" => $user['status']
                ];

                $token  = JWT::encode($payload, $secretKey, "HS256");
                echo json_encode([
                    "message" => "Sign-in successful",
                    "user_id" => $user['id'],
                    "username" => $user['username'],
                    "role" => $user['role'],
                    "status" => $user['status'],
                    "access_token" => $token
                ]);
            } else {
                echo json_encode(["status" => "error", "message" => "Invalid password"]);
            }

        } else {
            echo json_encode(["status" => "error", "message" => "User not found"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Database error"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Username and password required"]);
}
?>
