<?php 
// create for after modification
function read($id,$db){
	return read_data($id,$db);
}
function read_data($id,$db){
	if(!array_key_exists($id,$db->data)) return [
		"type" => "ERROR",
		"data" =>"data not exists"
	];
	return $db->data[$id];
 }
?>
