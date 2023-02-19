<?php

//define filter and error function

/* variables descryption
 * +---------------+---------+
 * |name           |type     |
 * +---------------+---------+
 * |body_decode    |stdClass |
 * |body           |string   |
 * |decode_status  |int      |
 * |               |         |
 * +---------------+---------+
*/

function send_error ( $code ) {
	http_response_code(400);
	$status = [
		0 => 'Invaild method or missing content-type',
		1 => 'Body is empty.',
		2 => 'No mode specify.',
		3 => 'JSON error.',
		4 => "NO ID.",
		5 => "NO VALUE TYPE OR ID.",
		6 => "file is not writeable or json error."
	];
	echo '{"error":"' . $status[$code] . '"}'. "\n";
	exit();
}

function check_request(){
	return (
		($_SERVER["REQUEST_METHOD"] == "POST") && 
		($_SERVER["CONTENT_TYPE"] == "application/json") 
	);
}


// check errors

if (!check_request()) send_error(0);
if ($body == '' ) send_error(1);
if ($decode_status != 0)send_error(3);

// return error when
// no mode property in body
// AND
// mode is empty
if ((!property_exists($body_decode,'mode' ))) send_error(2);
if ($body_decode->mode == "") send_error(2);

// return error when
// in r (read) mode
// AND
// body NOT have id
if (
	$body_decode->mode == "r" && 
	(!property_exists($body_decode,"id"))
)send_error(4);

// in w (write) mode
// AND
// body NOT have id AND value
if (
	$body_decode->mode == "w"&&
	!(
		property_exists($body_decode,"val") &&
		property_exists($body_decode,"id") &&
		property_exists($body_decode,"type")
	)
)send_error(5);
?>
