<?php
header('Access-Control-Allow-Origin: *');
$host = "localhost";
$dbuser = "root";
$pass = "";
$dbname = "elearningdb";

$connection = new mysqli($host, $dbuser, $pass, $dbname);

if ($connection->connect_error){
  die("Error happened");
}