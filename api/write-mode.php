<?php
// create for after modification
function write($type,$name,$value,$db){
	return write_data($type,$name,$value,$db);
}
function write_data($type,$name,$value,$db){
	if(!($type == 1 || $type == 0))return false;
	if(!($name == "name_list"))return false;
	$db->data["name_list"][] = $name;
	$db->data["name_list"] = array_unique($db->data["name_list"]);
	$db->data[$name] = [
		name=>$name,
		type=>$type,
		data=>$value
	]
	return $db->write();
?>
