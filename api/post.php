<?php

require_once("./json_db.php");

// set variable
$body=file_get_contents("php://input");
header("Content-type:application/json");
$body_decode=json_decode($body);
$config="../data/config.json";
$db="../data/db.jsom";
// read config file

function read_json($file_path){
	$file = fopen($file_path,'r');
	$data = fread($file,filesize($file_path));
	fclose($file);
	$json_data=json_decode($data);
	if (json_last_error() != 0) return "{}";
	return $json_data;
}

function write_json($file_path,$data){
	$data_json = json_decode($data);
	if(!is_writeable($filepath) || json_last_error() != 0){
		return false;
	}
	$file = fopen($file_path,"w");
	$backup_data = fread($file,filesize($file_path));
	$write_stt=fwrite($file,$data_json);
	fclose($file);
	return $write_stt;
}


//defined filter and error function

function send_error ( $code ) {
	http_response_code(400);
	$status = [
		0 => 'Invaild method or missing content-type',
		1 => 'Body is empty.',
		2 => 'No action specify.',
		3 => 'JSON error.'
	];
	echo '{"error":"' . $status[$code] . '"}';
	exit();
}

function check_request(){
	return (
		($_SERVER["REQUEST_METHOD"] == "POST") && 
		(getallheaders()["Content-Type"] == "application/json") 
	);
}


// check errors

if (!check_request()) send_error(0);
if ($body == '' ) send_error(1);
if (json_last_error() != 0)send_error(3);
if (!property_exists($body_decode,'action' ) && $body != '{}') send_error(2);


/*
 *  print out client request
echo $_SERVER["REQUEST_METHOD"]." ".$_SERVER["REQUEST_URI"]." ".$_SERVER["SERVER_PROTOCOL"]."\n";
foreach (getallheaders() as $name => $value) {
	echo "$name: $value \n";
}*/

// echo out request body
echo $body."\n";

// get data

$data = read_json($db);


// action get item(s)

function get_item($uid,$key){
	if(!property_exists($data,$uid)) return false;
}

?>
