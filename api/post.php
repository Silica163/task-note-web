<?php
// import files
require_once('json_db.php');
require_once('read-mode.php');
require_once('write-mode.php');

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

// request structure
// {
// 	"mode":"r"|"w",
// 	"id":String,
// 	"value":Array|String,
// 	"type":0|1
// }

$output = [];

if($body_decode->mode == "r"){
	$output = read($body_decode->id,$db_data);
}
if(body_decode->mode == "w"){
	$output = write(
		$body_decode->type,
		$body_decode->id,
		$body_decode->val,
		$db_data
	);
}

echo json_encode($output);

?>
