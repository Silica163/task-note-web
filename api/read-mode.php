<?php 
// create for after modification
function read($name,$db){
	return read_data($name,$db);
}
function read_data($name,$db){
	if(!property_exists($db,$name)) return [
		"type" => "ERROR",
		"data" =>"data not exists"
	];
	return $db->data[$name];
 }
?>
