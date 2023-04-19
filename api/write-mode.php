<?php
// create for after modification
function write($type,$id,$value,$db){
	return write_data($type,$id,$value,$db);
}
function write_data($type,$id,$value,$db){
	if(!($type == 1 || $type == 0))return false;
	if($id == "name_list")return false;
	if($value == NULL){
		unset(
			$db->data["name_list"][
				array_keys($db->data["name_list"],$id)[0]
			]
		);
		unset($db->data[$id]);
		$db->data["name_list"] = array_values($db->data["name_list"]);
		$result = $db->write();
		return $result;
	}
	$db->data["name_list"][] = $id;
	$db->data["name_list"] = array_values(array_unique($db->data["name_list"]));
	$db->data[$id] = [
		"id"=>$id,
		"type"=>$type,
		"data"=>$value
	];
	$result = $db->write();
	return $result;
}
?>
