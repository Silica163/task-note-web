<?php
// init zone

$body=file_get_contents("php://input");
header("Content-type:application/json");
$body_decode=json_decode($body);


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
		(getallheaders()["Content-type"] == "application/json") 
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

// action get item(s)


?>
