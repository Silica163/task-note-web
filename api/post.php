<?php
// import files
require_once('json_db.php');

// set variable
$body=file_get_contents("php://input");
header("Content-type:application/json");
$body_decode=json_decode($body);
$decode_status = json_last_error();
$config_file="../data/config.json";
$db_path="../data/db.json";

// read config file
$config=new json_db($config_file);
$config->read();

// check request
require_once('req_checker.php');

// echo out request body
echo $body."\n";

// read data
$db_data = new json_db($db_path);
$db_data->read();

?>
