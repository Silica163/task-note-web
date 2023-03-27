<?php
// create for after modification
function write($type,$id,$value,$db){
	return write_data($type,$id,$value,$db);
}
function write_data($type,$id,$value,$db){
	if(!($type == 1 || $type == 0))return false;
	if($id == "name_list")return false;
	$db->data["name_list"][] = $id;
	$db->data["name_list"] = array_unique($db->data["name_list"]);
	$db->data[$id] = [
		"id"=>$id,
		"type"=>$type,
		"data"=>$value
	];
	$result = $db->write();
	return $result;
}
?>
